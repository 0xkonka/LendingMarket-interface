import { deepCopy, Deferrable } from '@ethersproject/properties';
import { ConnectionInfo } from '@ethersproject/web';
import { Contract, ethers } from 'ethers';
import { Networkish } from '@ethersproject/networks';
import { BlockTag, TransactionRequest } from '@ethersproject/abstract-provider';
import { Transaction } from '@ethersproject/transactions';

// It uses the same address on many chains (definitely the case for Arbitrum and Binance Smart Chain)
// https://github.com/mds1/multicall
const MULTICALL_ADDRESS =
  import.meta.env.VITE_MULTICALL_ADDRESS || '0xcA11bde05977b3631167028862bE2a173976CA11';

// https://www.multicall3.com/abi#ethers-js
const MULTICALL_ABI_ETHERS = [
  'function aggregate(tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes[] returnData)',
  'function aggregate3(tuple(address target, bool allowFailure, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
  'function aggregate3Value(tuple(address target, bool allowFailure, uint256 value, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
  'function blockAndAggregate(tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes32 blockHash, tuple(bool success, bytes returnData)[] returnData)',
  'function getBasefee() view returns (uint256 basefee)',
  'function getBlockHash(uint256 blockNumber) view returns (bytes32 blockHash)',
  'function getBlockNumber() view returns (uint256 blockNumber)',
  'function getChainId() view returns (uint256 chainid)',
  'function getCurrentBlockCoinbase() view returns (address coinbase)',
  'function getCurrentBlockDifficulty() view returns (uint256 difficulty)',
  'function getCurrentBlockGasLimit() view returns (uint256 gaslimit)',
  'function getCurrentBlockTimestamp() view returns (uint256 timestamp)',
  'function getEthBalance(address addr) view returns (uint256 balance)',
  'function getLastBlockHash() view returns (bytes32 blockHash)',
  'function tryAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) payable returns (tuple(bool success, bytes returnData)[] returnData)',
  'function tryBlockAndAggregate(bool requireSuccess, tuple(address target, bytes callData)[] calls) payable returns (uint256 blockNumber, bytes32 blockHash, tuple(bool success, bytes returnData)[] returnData)',
];

const MAX_BATCH_SIZE = 75;

// Just leaving this here for now for ease of debugging until it is stable
const DEBUG = false;

const DEBUG_LOG = (...args: any[]) => {
  if (DEBUG) {
    console.log(...args);
  }
};

interface BatchItem {
  request: { method: string; params: any[] };
  resolve: (result: any) => void;
  reject: (error: Error) => void;
}

let BATCHING_ENABLED = sessionStorage.getItem('BATCHING_ENABLED') !== 'false';
if (window) {
  Object.assign(window, {
    TOGGLE_BATCHING: () => {
      BATCHING_ENABLED = !BATCHING_ENABLED;
      sessionStorage.setItem('BATCHING_ENABLED', BATCHING_ENABLED.toString());
      console.log(`Batching is now ${BATCHING_ENABLED ? 'enabled' : 'disabled'}`);
    },
  });
}

// Based on https://github.com/ethers-io/ethers.js/blob/f97b92bbb1bde22fcc44100af78d7f31602863ab/packages/providers/src.ts/json-rpc-batch-provider.ts
export class StaticJsonRpcBatchProvider extends ethers.providers.StaticJsonRpcProvider {
  private _pendingBatchAggregator: NodeJS.Timer | null = null;
  private _pendingBatch: BatchItem[] = [];
  private multicallContract: Contract;

  private readonly multicallAddress: string;

  constructor(
    url: ConnectionInfo | string,
    multicallAddress: string | undefined,
    network: Networkish
  ) {
    super(url, network);
    this.multicallAddress = multicallAddress || MULTICALL_ADDRESS;

    this.multicallContract = new Contract(this.multicallAddress, MULTICALL_ABI_ETHERS, this);
  }

  call(
    transaction: Deferrable<TransactionRequest>,
    blockTag?: BlockTag | Promise<BlockTag>
  ): Promise<string> {
    return super.call(transaction, blockTag);
  }

  /**
   * This is used to manually pass along customData so we can use it in `prepareRequest` and `send`
   * @param transaction
   */
  async _getTransactionRequest(transaction: Deferrable<TransactionRequest>): Promise<Transaction> {
    const tx = await super._getTransactionRequest(transaction);
    if (transaction.customData) {
      // @ts-ignore
      tx.customData = transaction.customData;
    }
    return tx;
  }

  /**
   * This is used to manually pass along customData, so we can use it in `send`
   */
  prepareRequest(method: string, params: any): [string, any[]] {
    if (method === 'call' && params?.transaction?.customData) {
      const { customData, ...transaction } = params.transaction;
      const base = super.prepareRequest(method, { ...params, transaction });
      return [base[0], [...base[1], { customData }]];
    }
    return super.prepareRequest(method, params);
  }

  send(method: string, params: any[]): Promise<any> {
    // 'eth_call's are batched unless they are to the Multicall3 contract
    const isMulticall =
      method === 'eth_call' && params[0].to === this.multicallAddress.toLowerCase();
    const overrideSkipMulticall = method === 'eth_call' && params[2]?.customData?.noMulticall;

    if (!BATCHING_ENABLED) {
      return super.send(method, params);
    }

    if (method !== 'eth_call' || isMulticall || overrideSkipMulticall) {
      if (overrideSkipMulticall) {
        DEBUG_LOG('Skipping multicall due to customData.noMulticall');
        return super.send(method, params.slice(0, 2));
      }
      if (isMulticall) {
        DEBUG_LOG('Dispatching multicall');
      }
      return super.send(method, params);
    }

    DEBUG_LOG('Enqueuing eth_call', params);

    const inflightRequest: any = { request: { method, params }, resolve: null, reject: null };

    const promise = new Promise((resolve, reject) => {
      inflightRequest.resolve = resolve;
      inflightRequest.reject = reject;
    });

    this._pendingBatch.push(inflightRequest);

    // If there are `MAX_BATCH_SIZE` requests in the batch, dispatch it immediately to reduce
    // the risk of running out of gas
    if (this._pendingBatch.length >= MAX_BATCH_SIZE) {
      DEBUG_LOG(`Batch size reached ${this._pendingBatch.length}, dispatching immediately`);
      this.dispatchBatch();
      return promise;
    }

    if (!this._pendingBatchAggregator) {
      // Schedule batch for next event loop + short duration
      this._pendingBatchAggregator = setTimeout(() => {
        DEBUG_LOG(
          `Batch timeout hit, dispatching multicall for ${this._pendingBatch.length} requests`
        );
        return this.dispatchBatch();
      }, 10);
    }

    return promise;
  }

  private dispatchBatch() {
    // Get the current batch and clear it, so new requests
    // go into the next batch
    const batch = this._pendingBatch;
    this._pendingBatch = [];
    if (this._pendingBatchAggregator) {
      clearTimeout(this._pendingBatchAggregator);
    }
    this._pendingBatchAggregator = null;

    // Get the request as an array of requests
    const resolverCalls = batch.map(({ request }) => ({
      target: request.params[0].to,
      allowFailure: true,
      callData: request.params[0].data,
    }));

    this.emit('debug', {
      action: 'requestBatch',
      request: deepCopy(resolverCalls),
      provider: this,
    });

    return this.multicallContract.callStatic.aggregate3(resolverCalls).then(
      (result: { success: boolean; returnData: string }[]) => {
        this.emit('debug', {
          action: 'response',
          request: resolverCalls,
          response: result,
          provider: this,
        });

        // For each result, feed it to the correct Promise, depending
        // on whether it was a success or error
        batch.forEach((inflightRequest, index) => {
          const payload = result[index];
          // Doing nothing when !payload.success seems to work because it decodes it and realizes there was an error
          inflightRequest.resolve(payload.returnData);
        });
      },
      (error) => {
        this.emit('debug', {
          action: 'response',
          error: error,
          request: resolverCalls,
          provider: this,
        });

        batch.forEach((inflightRequest) => {
          inflightRequest.reject(error);
        });
      }
    );
  }
}

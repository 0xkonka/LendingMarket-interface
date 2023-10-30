import { Contract, providers } from 'ethers';
import { BaseService, tEthereumAddress } from '@radiantcapital/contract-helpers';

import { Multicall__factory } from './Multicall__factory';
import { Multicall } from './Multicall';

export class MulticallContract extends BaseService<Multicall> {
  public readonly contractAddress: tEthereumAddress;
  targetContract: Contract;
  multicallArray: Multicall.CallStruct[];
  result: any;
  results: { [key: string]: any };
  calls: any[];

  constructor(provider: providers.Provider, MulticallAddr: string, targetContract: Contract) {
    super(provider, Multicall__factory);
    this.contractAddress = MulticallAddr;
    this.targetContract = targetContract;
    this.multicallArray = [] as Multicall.CallStruct[];
    this.results = {};
    this.calls = [];
  }

  public push(functionName: string) {
    this.multicallArray.push({
      target: this.targetContract.address,
      callData: this.targetContract.interface.encodeFunctionData(functionName),
    });

    this.calls.push(functionName);
  }

  public async execute() {
    const MulticallContract: Multicall = this.getContractInstance(this.contractAddress);
    this.results = (await MulticallContract.callStatic.aggregate(this.multicallArray)).returnData;
  }

  public get(functionName: string): any {
    let multicallReturnedData = this.results[this.calls.indexOf(functionName)];
    let value = this.targetContract.interface.decodeFunctionResult(
      functionName,
      multicallReturnedData
    );
    return value;
  }
}

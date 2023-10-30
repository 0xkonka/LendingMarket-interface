import { ethers, providers } from 'ethers';
import {
  BaseService,
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  tEthereumAddress,
  transactionType,
  ERC20Service,
  IERC20ServiceInterface,
  BaseDebtToken,
  BaseDebtTokenInterface,
  valueToWei,
} from '@radiantcapital/contract-helpers';

import { RadiantOFT__factory } from './RadiantOFT__factory';
import { RadiantOFT } from './RadiantOFT';

export class RadiantOFTContract extends BaseService<RadiantOFT> {
  public readonly contractAddress: tEthereumAddress;

  readonly erc20Service: IERC20ServiceInterface;
  readonly baseDebtToken: BaseDebtTokenInterface;

  constructor(provider: providers.Provider, radiantOFTAddr: string) {
    super(provider, RadiantOFT__factory);

    this.contractAddress = radiantOFTAddr;
    const erc20Service = new ERC20Service(provider);
    this.erc20Service = erc20Service;
    this.baseDebtToken = new BaseDebtToken(provider, erc20Service);
  }

  private getGasForDestination(destChainId: number) {
    let gasSettings: any = {
      102: 160000, // arb->bsc
      110: 3200000, // bsc->arb
    };
    let gasSetting = gasSettings[destChainId];
    return Math.floor(gasSetting * 1.01);
  }

  public async balanceOf(address: tEthereumAddress): Promise<ethers.BigNumber> {
    const radiantOFTContract: RadiantOFT = this.getContractInstance(this.contractAddress);
    const balance = await radiantOFTContract.callStatic.balanceOf(address);
    return balance;
  }

  public async estimateSendFee(destChainId: number, amount: string, user: tEthereumAddress) {
    const radiantOFTContract: RadiantOFT = this.getContractInstance(this.contractAddress);
    const { decimalsOf } = this.erc20Service;
    const convertedAmount: string = valueToWei(amount, await decimalsOf(this.contractAddress));

    let toAddressBytes32 = ethers.utils.defaultAbiCoder.encode(['address'], [user]);
    let gasSetting = this.getGasForDestination(destChainId);

    let adapterParams = ethers.utils.solidityPack(['uint16', 'uint256'], [1, gasSetting]); // default adapterParams example

    const fees = await radiantOFTContract.callStatic.estimateSendFee(
      destChainId,
      toAddressBytes32,
      convertedAmount,
      false,
      adapterParams
    );
    return fees;
  }

  public async bridge(
    user: tEthereumAddress,
    destChainId: number,
    amount: string,
    fee: string
  ): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];
    const radiantOFTContract: RadiantOFT = this.getContractInstance(this.contractAddress);
    let toAddressBytes32 = ethers.utils.defaultAbiCoder.encode(['address'], [user]);
    let gasSetting = this.getGasForDestination(destChainId);
    let adapterParams = ethers.utils.solidityPack(['uint16', 'uint256'], [1, gasSetting]); // default adapterParams example
    const { decimalsOf } = this.erc20Service;
    const convertedAmount: string = valueToWei(amount, await decimalsOf(this.contractAddress));
    console.log(user);
    console.log(destChainId);
    console.log(toAddressBytes32);
    console.log(convertedAmount);
    console.log({
      refundAddress: user, // refund address (if too much message fee is sent, it gets refunded)
      zroPaymentAddress: ethers.constants.AddressZero, // address(0x0) if not paying in ZRO (LayerZero Token)
      adapterParams: adapterParams, // flexible bytes array to indicate messaging adapter services
    });

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: () =>
        radiantOFTContract.populateTransaction.sendFrom(
          user, // 'from' address to send tokens
          destChainId, // remote LayerZero chainId
          toAddressBytes32, // 'to' address to send tokens
          convertedAmount, // amount of tokens to send (in wei)
          {
            refundAddress: user, // refund address (if too much message fee is sent, it gets refunded)
            zroPaymentAddress: ethers.constants.AddressZero, // address(0x0) if not paying in ZRO (LayerZero Token)
            adapterParams: adapterParams, // flexible bytes array to indicate messaging adapter services
          }
        ),
      from: user,
      value: fee,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.STAKE_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });
    return txs;
  }

  public async paused(): Promise<any> {
    const radiantOFTContract: RadiantOFT = this.getContractInstance(this.contractAddress);
    const pauseStatus = await radiantOFTContract.callStatic.paused();
    return pauseStatus;
  }
}

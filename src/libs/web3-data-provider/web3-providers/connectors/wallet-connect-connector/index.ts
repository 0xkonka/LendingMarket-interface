import { ConnectorUpdate } from '@web3-react/types';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

const __DEV__ = true;
export const URI_AVAILABLE = 'URI_AVAILABLE';

export class UserRejectedRequestError extends Error {
  public constructor() {
    super();
    this.name = this.constructor.name;
    this.message = 'The user rejected the request.';
  }
}

interface WalletConnectConnectorArguments {
  rpc: { [chainId: number]: string };
  preferredNetworkId?: number;
  bridge?: string;
  qrcode?: boolean;
  pollingInterval?: number;
}

export class WalletConnectConnector extends AbstractConnector {
  private readonly rpc: { [chainId: number]: string };
  private readonly preferredNetworkId?: number;
  private readonly bridge?: string;
  private readonly qrcode?: boolean;
  private readonly pollingInterval?: number;

  public walletConnectProvider?: any;

  constructor({
    rpc,
    bridge,
    qrcode,
    pollingInterval,
    preferredNetworkId,
  }: WalletConnectConnectorArguments) {
    super({ supportedChainIds: Object.keys(rpc).map((k) => Number(k)) });

    this.rpc = rpc;
    this.bridge = bridge;
    this.qrcode = qrcode;
    this.preferredNetworkId = preferredNetworkId;
    this.pollingInterval = pollingInterval;

    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
  }

  private handleChainChanged(chainId: number | string): void {
    if (__DEV__) {
      console.log("Handling 'chainChanged' event with payload", chainId);
    }
    this.emitUpdate({ chainId });
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (__DEV__) {
      console.log("Handling 'accountsChanged' event with payload", accounts);
    }
    this.emitUpdate({ account: accounts[0] });
  }

  private handleDisconnect(): void {
    if (__DEV__) {
      console.log("Handling 'disconnect' event");
    }
    this.emitDeactivate();
    // we have to do this because of a @walletconnect/web3-provider bug
    if (this.walletConnectProvider) {
      this.walletConnectProvider.disconnect();
      this.walletConnectProvider.removeListener('chainChanged', this.handleChainChanged);
      this.walletConnectProvider.removeListener('accountsChanged', this.handleAccountsChanged);
      this.walletConnectProvider = undefined;
    }

    this.emitDeactivate();
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!this.walletConnectProvider) {
      const newProvider = await EthereumProvider.init({
        projectId: 'e555b03492e850d0501e70aa902d380c',
        chains: [this.preferredNetworkId ?? 42161],
        // chains: Object.keys(this.rpc).map((k) => Number(k)),
        showQrModal: true,
        events: ['chainChanged', 'accountsChanged'],
        methods: [
          'eth_sendTransaction',
          'eth_signTransaction',
          'eth_sign',
          'personal_sign',
          'eth_signTypedData',
        ],
      });
      this.walletConnectProvider = newProvider;
    }

    const account = await this.walletConnectProvider
      .enable()
      .then((accounts: string[]): string => accounts[0])
      .catch((error: Error): void => {
        // TODO ideally this would be a better check
        if (error.message === 'User closed modal') {
          throw new UserRejectedRequestError();
        }

        throw error;
      });

    this.walletConnectProvider.on('disconnect', this.handleDisconnect);
    this.walletConnectProvider.on('chainChanged', this.handleChainChanged);
    this.walletConnectProvider.on('accountsChanged', this.handleAccountsChanged);

    const chainId = await this.walletConnectProvider.request({ method: 'eth_chainId' });
    localStorage.setItem('wallet-connect-chain-id', chainId);

    return { provider: this.walletConnectProvider, account };
  }

  public async getProvider(): Promise<any> {
    return this.walletConnectProvider;
  }

  public async getChainId(): Promise<number | string> {
    return this.walletConnectProvider.request({ method: 'eth_chainId' });
  }

  public async getAccount(): Promise<null | string> {
    return this.walletConnectProvider
      .request({ method: 'eth_accounts' })
      .then((accounts: string[]): string => accounts[0]);
  }

  public deactivate() {
    if (this.walletConnectProvider) {
      this.walletConnectProvider.disconnect();
      this.walletConnectProvider.removeListener('disconnect', this.handleDisconnect);
      this.walletConnectProvider.removeListener('chainChanged', this.handleChainChanged);
      this.walletConnectProvider.removeListener('accountsChanged', this.handleAccountsChanged);
    }
  }

  public async close() {
    await this.walletConnectProvider?.close();
  }
}

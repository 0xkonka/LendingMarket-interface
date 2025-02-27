/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type { PriceProvider, PriceProviderInterface } from './PriceProvider';

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'baseTokenPriceInUsdProxyAggregator',
    outputs: [
      {
        internalType: 'contract IChainlinkAggregator',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'eligibilityProvider',
    outputs: [
      {
        internalType: 'contract IRewardEligibleDataProvider',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLpTokenAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLpTokenPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLpTokenPriceUsd',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTokenPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTokenPriceUsd',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IChainlinkAggregator',
        name: '_baseTokenPriceInUsdProxyAggregator',
        type: 'address',
      },
      {
        internalType: 'contract IPoolHelper',
        name: '_poolHelper',
        type: 'address',
      },
      {
        internalType: 'contract IBaseOracle',
        name: '_oracle',
        type: 'address',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'oracle',
    outputs: [
      {
        internalType: 'contract IBaseOracle',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolHelper',
    outputs: [
      {
        internalType: 'contract IPoolHelper',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IRewardEligibleDataProvider',
        name: '_eligibilityProvider',
        type: 'address',
      },
    ],
    name: 'setRewardEligibilityProvider',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const _bytecode =
  '0x608060405234801561001057600080fd5b50604051610aac380380610aac83398101604081905261002f91610071565b600180546001600160a01b039485166001600160a01b0319918216179091556000805493851693821693909317909255600280549190931691161790556100d5565b600080600060608486031215610085578283fd5b8351610090816100bd565b60208501519093506100a1816100bd565b60408501519092506100b2816100bd565b809150509250925092565b6001600160a01b03811681146100d257600080fd5b50565b6109c8806100e46000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80636e9a05c51161005b5780636e9a05c5146100d05780636f5cdb6c146100d8578063914237da146100e0578063cf811d2a146100e857610088565b8063313ce5671461008d5780634b94f50e146100ab5780635fcbd285146100b35780636d2ed184146100c8575b600080fd5b6100956100f0565b6040516100a29190610968565b60405180910390f35b6100956100f8565b6100bb6102f7565b6040516100a29190610954565b610095610306565b610095610450565b61009561057a565b6100bb610768565b6100bb610777565b6305f5e10090565b6000806000600160009054906101000a90046001600160a01b03166001600160a01b0316630902f1ac6040518163ffffffff1660e01b815260040160606040518083038186803b15801561014b57600080fd5b505afa15801561015f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101839190610906565b506000805460015460408051630dfe168160e01b8152905195975093955091936001600160a01b03918216939290911691630dfe1681916004808301926020929190829003018186803b1580156101d957600080fd5b505afa1580156101ed573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061021191906108c7565b6001600160a01b031614156102265781610228565b825b6000805460015460408051630dfe168160e01b8152905194955092936001600160a01b03928316939290911691630dfe1681916004808301926020929190829003018186803b15801561027a57600080fd5b505afa15801561028e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102b291906108c7565b6001600160a01b0316146102c657826102c8565b835b905060006102d46100f0565b905060006102ec836102e68685610786565b906107e8565b965050505050505090565b6001546001600160a01b031681565b600080600260009054906101000a90046001600160a01b03166001600160a01b03166350d25bcd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561035757600080fd5b505afa15801561036b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061038f91906108ee565b90506000600260009054906101000a90046001600160a01b03166001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b1580156103e157600080fd5b505afa1580156103f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104199190610933565b60ff16905060006104286100f0565b905060006104346100f8565b90506000610446836102e68488610786565b9550505050505090565b600080600260009054906101000a90046001600160a01b03166001600160a01b03166350d25bcd6040518163ffffffff1660e01b815260040160206040518083038186803b1580156104a157600080fd5b505afa1580156104b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d991906108ee565b90506000600260009054906101000a90046001600160a01b03166001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561052b57600080fd5b505afa15801561053f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105639190610933565b60ff16905060006105726100f0565b905060006104345b6000806000600160009054906101000a90046001600160a01b03166001600160a01b0316630902f1ac6040518163ffffffff1660e01b815260040160606040518083038186803b1580156105cd57600080fd5b505afa1580156105e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106059190610906565b506000805460015460408051630dfe168160e01b8152905195975093955091936001600160a01b03918216939290911691630dfe1681916004808301926020929190829003018186803b15801561065b57600080fd5b505afa15801561066f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061069391906108c7565b6001600160a01b031614156106a857816106aa565b825b90506000610740670de0b6b3a7640000600160009054906101000a90046001600160a01b03166001600160a01b03166318160ddd6040518163ffffffff1660e01b815260040160206040518083038186803b15801561070857600080fd5b505afa15801561071c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102e691906108ee565b9050600061074c6100f0565b905060006102ec670de0b6b3a76400006102e685818887610786565b6000546001600160a01b031681565b6002546001600160a01b031681565b600082610795575060006107e2565b828202828482816107a257fe5b04146107df5760405162461bcd60e51b81526004018080602001828103825260218152602001806109726021913960400191505060405180910390fd5b90505b92915050565b60006107df83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250600081836108b15760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561087657818101518382015260200161085e565b50505050905090810190601f1680156108a35780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b5060008385816108bd57fe5b0495945050505050565b6000602082840312156108d8578081fd5b81516001600160a01b03811681146107df578182fd5b6000602082840312156108ff578081fd5b5051919050565b60008060006060848603121561091a578182fd5b8351925060208401519150604084015190509250925092565b600060208284031215610944578081fd5b815160ff811681146107df578182fd5b6001600160a01b0391909116815260200190565b9081526020019056fe536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a26469706673582212203b79f651268c4553fd2fcbf59151e7164cd55631534ce1e6982bb0e2db2b448b64736f6c63430007060033';

type PriceProviderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PriceProviderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PriceProvider__factory extends ContractFactory {
  constructor(...args: PriceProviderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _lpToken: string,
    _rdnt: string,
    _baseTokenPriceInUsdProxyAggregator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PriceProvider> {
    return super.deploy(
      _lpToken,
      _rdnt,
      _baseTokenPriceInUsdProxyAggregator,
      overrides || {}
    ) as Promise<PriceProvider>;
  }
  override getDeployTransaction(
    _lpToken: string,
    _rdnt: string,
    _baseTokenPriceInUsdProxyAggregator: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _lpToken,
      _rdnt,
      _baseTokenPriceInUsdProxyAggregator,
      overrides || {}
    );
  }
  override attach(address: string): PriceProvider {
    return super.attach(address) as PriceProvider;
  }
  override connect(signer: Signer): PriceProvider__factory {
    return super.connect(signer) as PriceProvider__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PriceProviderInterface {
    return new utils.Interface(_abi) as PriceProviderInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): PriceProvider {
    return new Contract(address, _abi, signerOrProvider) as PriceProvider;
  }
}

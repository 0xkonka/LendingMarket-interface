/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type { PromiseOrValue } from '../common';
import type {
  LendingPoolAddressesProvider,
  LendingPoolAddressesProviderInterface,
} from './LendingPoolAddressesProvider';

const _abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'marketId',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'hasProxy',
        type: 'bool',
      },
    ],
    name: 'AddressSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'ConfigurationAdminUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'EmergencyAdminUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'LendingPoolCollateralManagerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'LendingPoolConfiguratorUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'LendingPoolUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'LendingRateOracleUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'newMarketId',
        type: 'string',
      },
    ],
    name: 'MarketIdSet',
    type: 'event',
  },
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'PriceOracleUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'ProxyCreated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
    ],
    name: 'getAddress',
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
    name: 'getEmergencyAdmin',
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
    name: 'getLendingPool',
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
    name: 'getLendingPoolCollateralManager',
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
    name: 'getLendingPoolConfigurator',
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
    name: 'getLendingRateOracle',
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
    name: 'getLiquidationFeeTo',
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
    name: 'getMarketId',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPoolAdmin',
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
    name: 'getPriceOracle',
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
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'newAddress',
        type: 'address',
      },
    ],
    name: 'setAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'address',
        name: 'implementationAddress',
        type: 'address',
      },
    ],
    name: 'setAddressAsProxy',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'emergencyAdmin',
        type: 'address',
      },
    ],
    name: 'setEmergencyAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'manager',
        type: 'address',
      },
    ],
    name: 'setLendingPoolCollateralManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'configurator',
        type: 'address',
      },
    ],
    name: 'setLendingPoolConfiguratorImpl',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'pool',
        type: 'address',
      },
    ],
    name: 'setLendingPoolImpl',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'lendingRateOracle',
        type: 'address',
      },
    ],
    name: 'setLendingRateOracle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'liquidationFeeTo',
        type: 'address',
      },
    ],
    name: 'setLiquidationFeeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'marketId',
        type: 'string',
      },
    ],
    name: 'setMarketId',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'admin',
        type: 'address',
      },
    ],
    name: 'setPoolAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'priceOracle',
        type: 'address',
      },
    ],
    name: 'setPriceOracle',
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
];

const _bytecode =
  '0x60806040523480156200001157600080fd5b5060405162001edb38038062001edb833981810160405260208110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b506040525050506000620000ff6200018160201b60201c565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350620001548162000185565b50600380546001600160a01b03191673f90c69d16599a5c657a05fe76cd22fd9cab44598179055620002e6565b3390565b80516200019a9060019060208401906200023a565b507f5e667c32fd847cf8bce48ab3400175cbf107bdc82b2dea62e3364909dfaee799816040518080602001828103825283818151815260200191508051906020019080838360005b83811015620001fc578181015183820152602001620001e2565b50505050905090810190601f1680156200022a5780820380516001836020036101000a031916815260200191505b509250505060405180910390a150565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282620002725760008555620002bd565b82601f106200028d57805160ff1916838001178555620002bd565b82800160010185558215620002bd579182015b82811115620002bd578251825591602001919060010190620002a0565b50620002cb929150620002cf565b5090565b5b80821115620002cb5760008155600101620002d0565b611be580620002f66000396000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c8063715018a6116100c3578063ca446dd91161007c578063ca446dd91461038b578063ddcaa9ea146103b7578063e216ab44146103bf578063f2fde38b146103e5578063f67b18471461040b578063fca513a8146104b157610158565b8063715018a61461031f578063820d12741461032757806385c858b11461034d5780638da5cb5b14610355578063aecda3781461035d578063c12542df1461036557610158565b8063530e784f11610115578063530e784f1461021a578063568ef470146102405780635aef021f146102bd5780635afaf018146102e35780635dcc528c146102eb578063712d91711461031757610158565b80630261bf8b1461015d57806321f8a72114610181578063283d62ad1461019e57806335da3394146101c65780633618abba146101ec578063398e5553146101f4575b600080fd5b6101656104b9565b604080516001600160a01b039092168252519081900360200190f35b6101656004803603602081101561019757600080fd5b50356104d8565b6101c4600480360360208110156101b457600080fd5b50356001600160a01b03166104f3565b005b6101c4600480360360208110156101dc57600080fd5b50356001600160a01b03166105cb565b6101656106a8565b6101c46004803603602081101561020a57600080fd5b50356001600160a01b03166106c9565b6101c46004803603602081101561023057600080fd5b50356001600160a01b03166107a9565b610248610883565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561028257818101518382015260200161026a565b50505050905090810190601f1680156102af5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101c4600480360360208110156102d357600080fd5b50356001600160a01b0316610918565b6101656109c0565b6101c46004803603604081101561030157600080fd5b50803590602001356001600160a01b03166109cf565b610165610a78565b6101c4610a98565b6101c46004803603602081101561033d57600080fd5b50356001600160a01b0316610b3a565b610165610c1b565b610165610c42565b610165610c51565b6101c46004803603602081101561037b57600080fd5b50356001600160a01b0316610c69565b6101c4600480360360408110156103a157600080fd5b50803590602001356001600160a01b0316610d1e565b610165610ddf565b6101c4600480360360208110156103d557600080fd5b50356001600160a01b0316610dfc565b6101c4600480360360208110156103fb57600080fd5b50356001600160a01b0316610e76565b6101c46004803603602081101561042157600080fd5b81019060208101813564010000000081111561043c57600080fd5b82018360208201111561044e57600080fd5b8035906020019184600183028401116401000000008311171561047057600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610f6e945050505050565b610165610fd2565b60006104d36b13115391125391d7d413d3d360a21b6104d8565b905090565b6000908152600260205260409020546001600160a01b031690565b6104fb610fec565b6000546001600160a01b0390811691161461054b576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b692827a7a62fa0a226a4a760b11b600090815260026020527f8625fbc469bac10fd11de1d783dcd446542784dbcc535ef64a1da61860fda74c80546001600160a01b0319166001600160a01b03841690811790915560405190917fc20a317155a9e7d84e06b716b4b355d47742ab9f8c5d630e7f556553f582430d91a250565b6105d3610fec565b6000546001600160a01b03908116911614610623576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b6e22a6a2a923a2a721acafa0a226a4a760891b600090815260026020527f767aa9c986e1d88108b2558f00fbd21b689a0397581446e2e868cd70421026cc80546001600160a01b0319166001600160a01b03841690811790915560405190917fe19673fc861bfeb894cf2d6b7662505497ef31c0f489b742db24ee331082691691a250565b60006104d3724c454e44494e475f524154455f4f5241434c4560681b6104d8565b6106d1610fec565b6000546001600160a01b03908116911614610721576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b7121a7a62620aa22a920a62fa6a0a720a3a2a960711b600090815260026020527f65e3f3080e9127c1765503a54b8dbb495249e66169f096dfc87ee63bed17e22c80546001600160a01b0319166001600160a01b03841690811790915560405190917f991888326f0eab3df6084aadb82bee6781b5c9aa75379e8bc50ae8693454163891a250565b6107b1610fec565b6000546001600160a01b03908116911614610801576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b6b50524943455f4f5241434c4560a01b600090815260026020527f740f710666bd7a12af42df98311e541e47f7fd33d382d11602457a6d540cbd6380546001600160a01b0319166001600160a01b03841690811790915560405190917fefe8ab924ca486283a79dc604baa67add51afb82af1db8ac386ebbba643cdffd91a250565b60018054604080516020601f6002600019610100878916150201909516949094049384018190048102820181019092528281526060939092909183018282801561090e5780601f106108e35761010080835404028352916020019161090e565b820191906000526020600020905b8154815290600101906020018083116108f157829003601f168201915b5050505050905090565b610920610fec565b6000546001600160a01b03908116911614610970576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b6109896b13115391125391d7d413d3d360a21b82610ff0565b6040516001600160a01b038216907fc4e6c6cdf28d0edbd8bcf071d724d33cc2e7a30be7d06443925656e9cb492aa490600090a250565b6003546001600160a01b031690565b6109d7610fec565b6000546001600160a01b03908116911614610a27576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b610a318282610ff0565b604080518381526001602082015281516001600160a01b038416927ff2689d5d5cd0c639e137642cae5d40afced201a1a0327e7ac9358461dc9fff31928290030190a25050565b60006104d37121a7a62620aa22a920a62fa6a0a720a3a2a960711b6104d8565b610aa0610fec565b6000546001600160a01b03908116911614610af0576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b610b42610fec565b6000546001600160a01b03908116911614610b92576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b724c454e44494e475f524154455f4f5241434c4560681b600090815260026020527f10f0e20294ece4bd93e7a467dbf22ab9ab1740ebd0a532cc53066601e880c0cf80546001600160a01b0319166001600160a01b03841690811790915560405190917f5c29179aba6942020a8a2d38f65de02fb6b7f784e7f049ed3a3cab97621859b591a250565b60006104d3782622a72224a723afa827a7a62fa1a7a72324a3aaa920aa27a960391b6104d8565b6000546001600160a01b031690565b60006104d3692827a7a62fa0a226a4a760b11b6104d8565b610c71610fec565b6000546001600160a01b03908116911614610cc1576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b610ce7782622a72224a723afa827a7a62fa1a7a72324a3aaa920aa27a960391b82610ff0565b6040516001600160a01b038216907fdfabe479bad36782fb1e77fbfddd4e382671713527e4786cfc93a022ae76372990600090a250565b610d26610fec565b6000546001600160a01b03908116911614610d76576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b600082815260026020908152604080832080546001600160a01b0319166001600160a01b03861690811790915581518681529283019390935280517ff2689d5d5cd0c639e137642cae5d40afced201a1a0327e7ac9358461dc9fff319281900390910190a25050565b60006104d36e22a6a2a923a2a721acafa0a226a4a760891b6104d8565b610e04610fec565b6000546001600160a01b03908116911614610e54576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b600380546001600160a01b0319166001600160a01b0392909216919091179055565b610e7e610fec565b6000546001600160a01b03908116911614610ece576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b6001600160a01b038116610f135760405162461bcd60e51b8152600401808060200182810382526026815260200180611b6a6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b610f76610fec565b6000546001600160a01b03908116911614610fc6576040805162461bcd60e51b81526020600482018190526024820152600080516020611b90833981519152604482015290519081900360640190fd5b610fcf81611298565b50565b60006104d36b50524943455f4f5241434c4560a01b6104d8565b3390565b6000828152600260209081526040918290205482513060248083019190915284518083039091018152604490910190935290820180516001600160e01b031663189acdbd60e31b1790526001600160a01b0316908190816111bf573060405161105890611348565b6001600160a01b03909116815260405190819003602001906000f080158015611085573d6000803e3d6000fd5b509150816001600160a01b031663d1f5789485836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200180602001828103825283818151815260200191508051906020019080838360005b838110156110f45781810151838201526020016110dc565b50505050905090810190601f1680156111215780820380516001836020036101000a031916815260200191505b509350505050600060405180830381600087803b15801561114157600080fd5b505af1158015611155573d6000803e3d6000fd5b50505060008681526002602090815260409182902080546001600160a01b0319166001600160a01b038716908117909155825189815292519093507f1eb35cb4b5bbb23d152f3b4016a5a46c37a07ae930ed0956aba951e2311424389281900390910190a2611291565b816001600160a01b0316634f1ef28685836040518363ffffffff1660e01b815260040180836001600160a01b0316815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561122b578181015183820152602001611213565b50505050905090810190601f1680156112585780820380516001836020036101000a031916815260200191505b509350505050600060405180830381600087803b15801561127857600080fd5b505af115801561128c573d6000803e3d6000fd5b505050505b5050505050565b80516112ab906001906020840190611355565b507f5e667c32fd847cf8bce48ab3400175cbf107bdc82b2dea62e3364909dfaee799816040518080602001828103825283818151815260200191508051906020019080838360005b8381101561130b5781810151838201526020016112f3565b50505050905090810190601f1680156113385780820380516001836020036101000a031916815260200191505b509250505060405180910390a150565b610773806113f783390190565b828054600181600116156101000203166002900490600052602060002090601f01602090048101928261138b57600085556113d1565b82601f106113a457805160ff19168380011785556113d1565b828001600101855582156113d1579182015b828111156113d15782518255916020019190600101906113b6565b506113dd9291506113e1565b5090565b5b808211156113dd57600081556001016113e256fe60a060405234801561001057600080fd5b506040516107733803806107738339818101604052602081101561003357600080fd5b5051606081901b6001600160601b0319166080526001600160a01b03166106f36100806000398061022852806102725280610331528061045e528061048752806105af52506106f36000f3fe60806040526004361061004a5760003560e01c80633659cfe6146100545780634f1ef286146100875780635c60da1b14610107578063d1f5789414610138578063f851a440146101ee575b610052610203565b005b34801561006057600080fd5b506100526004803603602081101561007757600080fd5b50356001600160a01b031661021d565b6100526004803603604081101561009d57600080fd5b6001600160a01b0382351691908101906040810160208201356401000000008111156100c857600080fd5b8201836020820111156100da57600080fd5b803590602001918460018302840111640100000000831117156100fc57600080fd5b509092509050610267565b34801561011357600080fd5b5061011c610324565b604080516001600160a01b039092168252519081900360200190f35b6100526004803603604081101561014e57600080fd5b6001600160a01b03823516919081019060408101602082013564010000000081111561017957600080fd5b82018360208201111561018b57600080fd5b803590602001918460018302840111640100000000831117156101ad57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550610371945050505050565b3480156101fa57600080fd5b5061011c610451565b61020b6104ab565b61021b6102166104b3565b6104d8565b565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016141561025c57610257816104fc565b610264565b610264610203565b50565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161415610317576102a1836104fc565b6000836001600160a01b031683836040518083838082843760405192019450600093509091505080830381855af49150503d80600081146102fe576040519150601f19603f3d011682016040523d82523d6000602084013e610303565b606091505b505090508061031157600080fd5b5061031f565b61031f610203565b505050565b6000336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614156103665761035f6104b3565b905061036e565b61036e610203565b90565b600061037b6104b3565b6001600160a01b03161461038e57600080fd5b6103978261053c565b80511561044d576000826001600160a01b0316826040518082805190602001908083835b602083106103da5780518252601f1990920191602091820191016103bb565b6001836020036101000a038019825116818451168082178552505050505050905001915050600060405180830381855af49150503d806000811461043a576040519150601f19603f3d011682016040523d82523d6000602084013e61043f565b606091505b505090508061031f57600080fd5b5050565b6000336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016141561036657507f000000000000000000000000000000000000000000000000000000000000000061036e565b61021b6105a4565b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5490565b3660008037600080366000845af43d6000803e8080156104f7573d6000f35b3d6000fd5b6105058161053c565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b61054581610614565b6105805760405162461bcd60e51b815260040180806020018281038252603b815260200180610683603b913960400191505060405180910390fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016141561060c5760405162461bcd60e51b81526004018080602001828103825260328152602001806106516032913960400191505060405180910390fd5b61021b61021b565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47081811480159061064857508115155b94935050505056fe43616e6e6f742063616c6c2066616c6c6261636b2066756e6374696f6e2066726f6d207468652070726f78792061646d696e43616e6e6f742073657420612070726f787920696d706c656d656e746174696f6e20746f2061206e6f6e2d636f6e74726163742061646472657373a2646970667358221220354176803b54436ecdaea6509259ddd412b0447c3107a85e8ae96b5f8424f8e564736f6c634300070600334f776e61626c653a206e6577206f776e657220697320746865207a65726f20616464726573734f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572a26469706673582212203cec58fecfb8a9f0f864bc62a96ec3833152b596cbaea45a92fd66f03567aa9464736f6c63430007060033';

type LendingPoolAddressesProviderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LendingPoolAddressesProviderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LendingPoolAddressesProvider__factory extends ContractFactory {
  constructor(...args: LendingPoolAddressesProviderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    marketId: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<LendingPoolAddressesProvider> {
    return super.deploy(marketId, overrides || {}) as Promise<LendingPoolAddressesProvider>;
  }
  override getDeployTransaction(
    marketId: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(marketId, overrides || {});
  }
  override attach(address: string): LendingPoolAddressesProvider {
    return super.attach(address) as LendingPoolAddressesProvider;
  }
  override connect(signer: Signer): LendingPoolAddressesProvider__factory {
    return super.connect(signer) as LendingPoolAddressesProvider__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LendingPoolAddressesProviderInterface {
    return new utils.Interface(_abi) as LendingPoolAddressesProviderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LendingPoolAddressesProvider {
    return new Contract(address, _abi, signerOrProvider) as LendingPoolAddressesProvider;
  }
}

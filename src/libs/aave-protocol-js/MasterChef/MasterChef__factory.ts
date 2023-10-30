/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, BigNumberish, Contract, ContractFactory, Overrides } from 'ethers';
import { Provider, TransactionRequest } from '@ethersproject/providers';
import type { MasterChef, MasterChefInterface } from './MasterChef';

const _abi = [
  {
    inputs: [
      {
        internalType: 'uint128[]',
        name: '_startTimeOffset',
        type: 'uint128[]',
      },
      {
        internalType: 'uint128[]',
        name: '_rewardsPerSecond',
        type: 'uint128[]',
      },
      {
        internalType: 'address',
        name: '_poolConfigurator',
        type: 'address',
      },
      {
        internalType: 'contract IMultiFeeDistribution',
        name: '_rewardMinter',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_maxMintable',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Deposit',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'EmergencyWithdraw',
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
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Withdraw',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_allocPoint',
        type: 'uint256',
      },
    ],
    name: 'addPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_tokens',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: '_allocPoints',
        type: 'uint256[]',
      },
    ],
    name: 'batchUpdateAllocPoint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: '_tokens',
        type: 'address[]',
      },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'claimReceiver',
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
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'address[]',
        name: '_tokens',
        type: 'address[]',
      },
    ],
    name: 'claimableReward',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
    ],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'emissionSchedule',
    outputs: [
      {
        internalType: 'uint128',
        name: 'startTimeOffset',
        type: 'uint128',
      },
      {
        internalType: 'uint128',
        name: 'rewardsPerSecond',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxMintableTokens',
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
    name: 'mintedTokens',
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
    name: 'poolConfigurator',
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
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'poolInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'allocPoint',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastRewardTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'accRewardPerShare',
        type: 'uint256',
      },
      {
        internalType: 'contract IOnwardIncentivesController',
        name: 'onwardIncentives',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'poolLength',
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
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'registeredTokens',
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
    inputs: [],
    name: 'rewardMinter',
    outputs: [
      {
        internalType: 'contract IMultiFeeDistribution',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardsPerSecond',
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
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address',
      },
    ],
    name: 'setClaimReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'contract IOnwardIncentivesController',
        name: '_incentives',
        type: 'address',
      },
    ],
    name: 'setOnwardIncentives',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'start',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'startTime',
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
    name: 'totalAllocPoint',
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
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userBaseClaimable',
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
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rewardDebt',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const _bytecode =
  '0x60a06040526000600a553480156200001657600080fd5b506040516200231138038062002311833981810160405260a08110156200003c57600080fd5b81019080805160405193929190846401000000008211156200005d57600080fd5b9083019060208201858111156200007357600080fd5b82518660208202830111640100000000821117156200009157600080fd5b82525081516020918201928201910280838360005b83811015620000c0578181015183820152602001620000a6565b5050505090500160405260200180516040519392919084640100000000821115620000ea57600080fd5b9083019060208201858111156200010057600080fd5b82518660208202830111640100000000821117156200011e57600080fd5b82525081516020918201928201910280838360005b838110156200014d57818101518382015260200162000133565b50505050919091016040908152602083015190830151606090930151909450919250600090506200017d620002b8565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600180546001600160a01b038086166001600160a01b0319928316179092556002805492851692909116919091179055845160001981015b6001810115620002a857600760405180604001604052808984815181106200022357fe5b60200260200101516001600160801b031681526020018884815181106200024657fe5b6020908102919091018101516001600160801b03908116909252835460018101855560009485529381902083519401805493909101518216600160801b029382166001600160801b0319909316929092171691909117905560001901620001ff565b505060805250620002bc92505050565b3390565b608051612030620002e1600039806106ef5280611b6e5280611ba252506120306000f3fe608060405234801561001057600080fd5b50600436106101a95760003560e01c80638da5cb5b116100f9578063cd1a4d8611610097578063e5b5349811610071578063e5b5349814610595578063eacdaabc14610663578063f2fde38b1461066b578063f3fef3a314610691576101a9565b8063cd1a4d8614610539578063de7e410c14610567578063e20c5a8a1461056f576101a9565b80639a7b5f11116100d35780639a7b5f11146104ae5780639b8e556314610503578063be9a65551461050b578063bfccff4514610513576101a9565b80638da5cb5b146103ef5780638e2eba09146104135780639a0ba2ea14610491576101a9565b8063334d0bbd116101665780636ff1c9bc116101405780636ff1c9bc146103b1578063715018a6146103d757806378e97925146103df5780638d75fe05146103e7576101a9565b8063334d0bbd1461027b57806334c54230146102c757806347e7ef2414610385576101a9565b8063081e3eda146101ae5780630f208beb146101c857806317caf6f11461020f5780631a848e011461021757806332a9caba1461021f578063332875641461024d575b600080fd5b6101b66106bd565b60408051918252519081900360200190f35b6101f6600480360360408110156101de57600080fd5b506001600160a01b03813581169160200135166106c3565b6040805192835260208301919091528051918290030190f35b6101b66106e7565b6101b66106ed565b61024b6004803603604081101561023557600080fd5b506001600160a01b038135169060200135610711565b005b61024b6004803603604081101561026357600080fd5b506001600160a01b038135811691602001351661084a565b6102986004803603602081101561029157600080fd5b50356108b0565b60405180836001600160801b03168152602001826001600160801b031681526020019250505060405180910390f35b61024b600480360360408110156102dd57600080fd5b810190602081018135600160201b8111156102f757600080fd5b82018360208201111561030957600080fd5b803590602001918460208302840111600160201b8311171561032a57600080fd5b919390929091602081019035600160201b81111561034757600080fd5b82018360208201111561035957600080fd5b803590602001918460208302840111600160201b8311171561037a57600080fd5b5090925090506108e5565b61024b6004803603604081101561039b57600080fd5b506001600160a01b038135169060200135610a13565b61024b600480360360208110156103c757600080fd5b50356001600160a01b0316610c6f565b61024b610e05565b6101b6610ea7565b6101b6610ead565b6103f7610eb3565b604080516001600160a01b039092168252519081900360200190f35b61024b6004803603604081101561042957600080fd5b6001600160a01b038235169190810190604081016020820135600160201b81111561045357600080fd5b82018360208201111561046557600080fd5b803590602001918460208302840111600160201b8311171561048657600080fd5b509092509050610ec2565b6103f7600480360360208110156104a757600080fd5b5035611016565b6104d4600480360360208110156104c457600080fd5b50356001600160a01b0316611040565b604080519485526020850193909352838301919091526001600160a01b03166060830152519081900360800190f35b6103f7611070565b61024b61107f565b6101b66004803603602081101561052957600080fd5b50356001600160a01b03166110ea565b61024b6004803603604081101561054f57600080fd5b506001600160a01b03813581169160200135166110fc565b6103f76111aa565b6103f76004803603602081101561058557600080fd5b50356001600160a01b03166111b9565b610613600480360360408110156105ab57600080fd5b6001600160a01b038235169190810190604081016020820135600160201b8111156105d557600080fd5b8201836020820111156105e757600080fd5b803590602001918460208302840111600160201b8311171561060857600080fd5b5090925090506111d4565b60408051602080825283518183015283519192839290830191858101910280838360005b8381101561064f578181015183820152602001610637565b505050509050019250505060405180910390f35b6101b66113b7565b61024b6004803603602081101561068157600080fd5b50356001600160a01b03166113bd565b61024b600480360360408110156106a757600080fd5b506001600160a01b0381351690602001356114b5565b60055490565b60086020908152600092835260408084209091529082529020805460019091015482565b600a5481565b7f000000000000000000000000000000000000000000000000000000000000000081565b610719611747565b6000546001600160a01b03908116911614610769576040805162461bcd60e51b81526020600482018190526024820152600080516020611fb1833981519152604482015290519081900360640190fd5b6001600160a01b0382166000908152600660205260409020600101541561078f57600080fd5b61079761174b565b600a546107a49082611805565b600a556005805460018181019092557f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b039485166001600160a01b0319918216811790925560408051608081018252948552426020868101918252600087840181815260608901828152968252600690925292909220955186555193850193909355915160028401555160039092018054929093169116179055565b336001600160a01b03831614806108795750610864610eb3565b6001600160a01b0316336001600160a01b0316145b61088257600080fd5b6001600160a01b039182166000908152600c6020526040902080546001600160a01b03191691909216179055565b600781815481106108c057600080fd5b6000918252602090912001546001600160801b038082169250600160801b9091041682565b6108ed611747565b6000546001600160a01b0390811691161461093d576040805162461bcd60e51b81526020600482018190526024820152600080516020611fb1833981519152604482015290519081900360640190fd5b82811461094957600080fd5b610951611868565b600a5460005b84811015610a095760006006600088888581811061097157fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b03168152602001908152602001600020905060008160010154116109b457600080fd5b6109e78585848181106109c357fe5b905060200201356109e18360000154866118b190919063ffffffff16565b90611805565b92508484838181106109f557fe5b602002919091013590915550600101610957565b50600a5550505050565b6001600160a01b03821660009081526006602052604090206001810154610a3957600080fd5b610a4161174b565b610a4d83600a546118f3565b6001600160a01b03831660009081526008602090815260408083203384529091529020805460028301548115610add576001830154600090610aa890610aa264e8d4a51000610a9c8787611a22565b90611a7b565b906118b1565b90508015610adb5733600090815260096020526040902054610aca9082611805565b336000908152600960205260409020555b505b610af26001600160a01b038716333088611abd565b610afc8286611805565b8084559150610b1464e8d4a51000610a9c8484611a22565b600184015560038401546001600160a01b031615610c27576000866001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015610b7b57600080fd5b505afa158015610b8f573d6000803e3d6000fd5b505050506040513d6020811015610ba557600080fd5b505160038601546040805163ae0b537160e01b81526001600160a01b038b811660048301523360248301526044820188905260648201859052915193945091169163ae0b53719160848082019260009290919082900301818387803b158015610c0d57600080fd5b505af1158015610c21573d6000803e3d6000fd5b50505050505b60408051868152905133916001600160a01b038916917f5548c837ab068cf56a2c2479df0882a4922fd203edb7517321831d95078c5f629181900360200190a3505050505050565b6001600160a01b038116600081815260066020908152604080832060088352818420338086529352908320805484825560018201949094559093909291610cb7919083611b17565b60408051828152905133916001600160a01b038716917ff24ef89f38eadc1bde50701ad6e4d6d11a2dc24f7cf834a486991f38833285049181900360200190a360038301546001600160a01b031615610dff576000846001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b158015610d5957600080fd5b505afa158015610d6d573d6000803e3d6000fd5b505050506040513d6020811015610d8357600080fd5b505160038501546040805163ae0b537160e01b81526001600160a01b0389811660048301523360248301526000604483018190526064830186905292519495509092169263ae0b537192608480820193929182900301818387803b158015610dea57600080fd5b505af1925050508015610dfb575060015b505b505b50505050565b610e0d611747565b6000546001600160a01b03908116911614610e5d576040805162461bcd60e51b81526020600482018190526024820152600080516020611fb1833981519152604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b600b5481565b60045481565b6000546001600160a01b031690565b610eca61174b565b6001600160a01b0383166000908152600960205260408120805490829055600a5490915b8381101561100b57600060066000878785818110610f0857fe5b905060200201356001600160a01b03166001600160a01b03166001600160a01b0316815260200190815260200160002090506000816001015411610f4b57600080fd5b610f70868684818110610f5a57fe5b905060200201356001600160a01b0316846118f3565b600060086000888886818110610f8257fe5b6001600160a01b036020918202939093013583168452838101949094525060409182016000908120918c1681529252812060028401548154919350610fd29164e8d4a5100091610a9c9190611a22565b9050610ff5610fee8360010154836118b190919063ffffffff16565b8790611805565b6001928301919091559450919091019050610eee565b50610dfd8583611b69565b6005818154811061102657600080fd5b6000918252602090912001546001600160a01b0316905081565b6006602052600090815260409020805460018201546002830154600390930154919290916001600160a01b031684565b6002546001600160a01b031681565b611087611747565b6000546001600160a01b039081169116146110d7576040805162461bcd60e51b81526020600482018190526024820152600080516020611fb1833981519152604482015290519081900360640190fd5b600b54156110e457600080fd5b42600b55565b60096020526000908152604090205481565b611104611747565b6000546001600160a01b03908116911614611154576040805162461bcd60e51b81526020600482018190526024820152600080516020611fb1833981519152604482015290519081900360640190fd5b6001600160a01b03821660009081526006602052604090206001015461117957600080fd5b6001600160a01b03918216600090815260066020526040902060030180546001600160a01b03191691909216179055565b6001546001600160a01b031681565b600c602052600090815260409020546001600160a01b031681565b606060008267ffffffffffffffff811180156111ef57600080fd5b50604051908082528060200260200182016040528015611219578160200160208202803683370190505b50905060005b838110156113ae57600085858381811061123557fe5b6001600160a01b03602091820293909301358316600081815260068352604080822060088552818320968e168352958452808220600287015482516370a0823160e01b8152306004820152925194985090955093919287926370a082319260248082019391829003018186803b1580156112ae57600080fd5b505afa1580156112c2573d6000803e3d6000fd5b505050506040513d60208110156112d857600080fd5b50516001850154909150421180156112ef57508015155b1561135e57600061130d8560010154426118b190919063ffffffff16565b9050600061133a600a54610a9c886000015461133460035487611a2290919063ffffffff16565b90611a22565b905061135961135284610a9c8464e8d4a51000611a22565b8590611805565b935050505b6113868360010154610aa264e8d4a51000610a9c868860000154611a2290919063ffffffff16565b87878151811061139257fe5b602090810291909101015250506001909301925061121f915050565b50949350505050565b60035481565b6113c5611747565b6000546001600160a01b03908116911614611415576040805162461bcd60e51b81526020600482018190526024820152600080516020611fb1833981519152604482015290519081900360640190fd5b6001600160a01b03811661145a5760405162461bcd60e51b8152600401808060200182810382526026815260200180611f6a6026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b038216600090815260066020526040902060018101546114db57600080fd5b6001600160a01b0383166000908152600860209081526040808320338452909152902080548381101561154a576040805162461bcd60e51b81526020600482015260126024820152711dda5d1a191c985dce881b9bdd0819dbdbd960721b604482015290519081900360640190fd5b61155261174b565b61155e85600a546118f3565b6002830154600183015460009061158290610aa264e8d4a51000610a9c8787611a22565b905080156115b557336000908152600960205260409020546115a49082611805565b336000908152600960205260409020555b6115bf83876118b1565b80855592506115d764e8d4a51000610a9c8585611a22565b60018501556115f06001600160a01b0388163388611b17565b60038501546001600160a01b0316156116fe576000876001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561165257600080fd5b505afa158015611666573d6000803e3d6000fd5b505050506040513d602081101561167c57600080fd5b505160038701546040805163ae0b537160e01b81526001600160a01b038c811660048301523360248301526044820189905260648201859052915193945091169163ae0b53719160848082019260009290919082900301818387803b1580156116e457600080fd5b505af11580156116f8573d6000803e3d6000fd5b50505050505b60408051878152905133916001600160a01b038a16917f9b1bfa7fa9ee420a16e124f794c35ac9f90472acc99140eb2f6447c714cad8eb9181900360200190a350505050505050565b3390565b600754600b541580159061175f5750600081115b156118025760006007600183038154811061177657fe5b6000918252602091829020604080518082019091529101546001600160801b03808216808452600160801b9092041692820192909252600b549092506117bd9042906118b1565b1115611800576117cb611868565b60208101516001600160801b031660035560078054806117e757fe5b6000828152602081208201600019908101919091550190555b505b50565b60008282018381101561185f576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b90505b92915050565b600a5460055460005b818110156118ac576118a46005828154811061188957fe5b6000918252602090912001546001600160a01b0316846118f3565b600101611871565b505050565b600061185f83836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250611c7a565b6001600160a01b03821660009081526006602052604090206001810154421161191c5750611800565b6000836001600160a01b03166370a08231306040518263ffffffff1660e01b815260040180826001600160a01b0316815260200191505060206040518083038186803b15801561196b57600080fd5b505afa15801561197f573d6000803e3d6000fd5b505050506040513d602081101561199557600080fd5b50519050806119ab575042600190910155611800565b60006119c48360010154426118b190919063ffffffff16565b905060006119e985610a9c866000015461133460035487611a2290919063ffffffff16565b9050611a0c611a0184610a9c8464e8d4a51000611a22565b600286015490611805565b6002850155505042600190920191909155505050565b600082611a3157506000611862565b82820282848281611a3e57fe5b041461185f5760405162461bcd60e51b8152600401808060200182810382526021815260200180611f906021913960400191505060405180910390fd5b600061185f83836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f000000000000815250611d11565b604080516001600160a01b0380861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b179052610dff908590611d76565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b1790526118ac908490611d76565b6004547f0000000000000000000000000000000000000000000000000000000000000000611b978284611805565b1115611bca57611bc77f0000000000000000000000000000000000000000000000000000000000000000826118b1565b91505b81156118ac57611bda8183611805565b6004556001600160a01b038084166000908152600c60205260409020541680611c005750825b600254604080516334686fad60e21b81526001600160a01b03848116600483015260248201879052600160448301529151919092169163d1a1beb491606480830192600092919082900301818387803b158015611c5c57600080fd5b505af1158015611c70573d6000803e3d6000fd5b5050505050505050565b60008184841115611d095760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015611cce578181015183820152602001611cb6565b50505050905090810190601f168015611cfb5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b60008183611d605760405162461bcd60e51b8152602060048201818152835160248401528351909283926044909101919085019080838360008315611cce578181015183820152602001611cb6565b506000838581611d6c57fe5b0495945050505050565b611d88826001600160a01b0316611f2d565b611dd9576040805162461bcd60e51b815260206004820152601f60248201527f5361666545524332303a2063616c6c20746f206e6f6e2d636f6e747261637400604482015290519081900360640190fd5b600080836001600160a01b0316836040518082805190602001908083835b60208310611e165780518252601f199092019160209182019101611df7565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611e78576040519150601f19603f3d011682016040523d82523d6000602084013e611e7d565b606091505b509150915081611ed4576040805162461bcd60e51b815260206004820181905260248201527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564604482015290519081900360640190fd5b805115610dff57808060200190516020811015611ef057600080fd5b5051610dff5760405162461bcd60e51b815260040180806020018281038252602a815260200180611fd1602a913960400191505060405180910390fd5b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470818114801590611f6157508115155b94935050505056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65725361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a2646970667358221220cc57cf6a9bc5022e49f9d0e2c95751605eb73d4066d1db1f100485ba2f3941d364736f6c63430007060033';

export class MasterChef__factory extends ContractFactory {
  constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _startTimeOffset: BigNumberish[],
    _rewardsPerSecond: BigNumberish[],
    _poolConfigurator: string,
    _rewardMinter: string,
    _maxMintable: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MasterChef> {
    return super.deploy(
      _startTimeOffset,
      _rewardsPerSecond,
      _poolConfigurator,
      _rewardMinter,
      _maxMintable,
      overrides || {}
    ) as Promise<MasterChef>;
  }
  getDeployTransaction(
    _startTimeOffset: BigNumberish[],
    _rewardsPerSecond: BigNumberish[],
    _poolConfigurator: string,
    _rewardMinter: string,
    _maxMintable: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _startTimeOffset,
      _rewardsPerSecond,
      _poolConfigurator,
      _rewardMinter,
      _maxMintable,
      overrides || {}
    );
  }
  attach(address: string): MasterChef {
    return super.attach(address) as MasterChef;
  }
  connect(signer: Signer): MasterChef__factory {
    return super.connect(signer) as MasterChef__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MasterChefInterface {
    return new utils.Interface(_abi) as MasterChefInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): MasterChef {
    return new Contract(address, _abi, signerOrProvider) as MasterChef;
  }
}

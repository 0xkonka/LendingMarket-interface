/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers';
import type { Provider, TransactionRequest } from '@ethersproject/providers';
import type { PromiseOrValue } from '../common';
import type { BountyManager, BountyManagerInterface } from './BountyManager';

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_newVal',
        type: 'uint256',
      },
    ],
    name: 'BaseBountyUsdTargetUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_newVal',
        type: 'uint256',
      },
    ],
    name: 'BountyBoosterUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_bal',
        type: 'uint256',
      },
    ],
    name: 'BountyReserveEmpty',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract IChefIncentivesController',
        name: '_chef',
        type: 'address',
      },
    ],
    name: 'ChefIncentivesControllerUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'Disqualified',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_newVal',
        type: 'uint256',
      },
    ],
    name: 'HunterShareUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_newVal',
        type: 'uint256',
      },
    ],
    name: 'MaxBaseBountyUpdated',
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
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Paused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_newVal',
        type: 'uint256',
      },
    ],
    name: 'SlippageLimitUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'Unpaused',
    type: 'event',
  },
  {
    inputs: [],
    name: 'HUNTER_SHARE',
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
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'addAddressToWL',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'baseBountyUsdTarget',
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
    name: 'bountyBooster',
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
    name: 'bountyCount',
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
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'changeWL',
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
        internalType: 'uint256',
        name: '_actionType',
        type: 'uint256',
      },
    ],
    name: 'claim',
    outputs: [
      {
        internalType: 'uint256',
        name: 'bounty',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'actionType',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'eligibilityDataProvider',
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
        internalType: 'bool',
        name: '_execute',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '_actionType',
        type: 'uint256',
      },
    ],
    name: 'executeBounty',
    outputs: [
      {
        internalType: 'uint256',
        name: 'bounty',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'actionType',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBaseBounty',
    outputs: [
      {
        internalType: 'uint256',
        name: 'bounty',
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
        name: '_rdnt',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_weth',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_mfd',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_chef',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_priceProvider',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_eligibilityDataProvider',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_compounder',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_hunterShare',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_baseBountyUsdTarget',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_maxBaseBounty',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_bountyBooster',
        type: 'uint256',
      },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxBaseBounty',
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
    name: 'minDLPBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: 'minDLPBalance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minStakeAmount',
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
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'priceProvider',
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
    ],
    name: 'quote',
    outputs: [
      {
        internalType: 'uint256',
        name: 'bounty',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'actionType',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rdnt',
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
        name: 'tokenAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenAmount',
        type: 'uint256',
      },
    ],
    name: 'recoverERC20',
    outputs: [],
    stateMutability: 'nonpayable',
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
        internalType: 'uint256',
        name: '_newVal',
        type: 'uint256',
      },
    ],
    name: 'setBaseBountyUsdTarget',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'setBounties',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newVal',
        type: 'uint256',
      },
    ],
    name: 'setBountyBooster',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newVal',
        type: 'uint256',
      },
    ],
    name: 'setHunterShare',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newVal',
        type: 'uint256',
      },
    ],
    name: 'setMaxBaseBounty',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_minStakeAmount',
        type: 'uint256',
      },
    ],
    name: 'setMinStakeAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newVal',
        type: 'uint256',
      },
    ],
    name: 'setSlippageLimit',
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
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'weth',
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
    name: 'whitelist',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'whitelistActive',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const _bytecode =
  '0x608060405234801561001057600080fd5b50611fc2806100206000396000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c80635d0f5396116100de578063b888879e11610097578063d8c0e25311610071578063d8c0e253146102ce578063d9cdd513146102d6578063f2fde38b146102de578063f5822693146102f157610173565b8063b888879e146102b6578063d1025c0c146102be578063d7ae73ae146102c657610173565b80635d0f5396146102655780635ebd4f9f1461026d578063715018a6146102805780638980f11f146102885780638da5cb5b1461029b578063b200e2c8146102a357610173565b80632d54f823116101305780632d54f823146102055780633986de6a1461020d5780633e362c96146102205780633fc8cef31461022857806359cec45b1461023d5780635c975abb1461025057610173565b8063015d8761146101785780630b39ed471461018d5780631a2baad6146101b75780631fe4ba17146101cc5780632a50ddd2146101df5780632bc43fd9146101f2575b600080fd5b61018b610186366004611b22565b610304565b005b6101a061019b3660046119cd565b6103a6565b6040516101ae929190611e62565b60405180910390f35b6101bf610497565b6040516101ae9190611e59565b61018b6101da366004611b22565b610559565b61018b6101ed366004611b22565b6105f0565b6101a0610200366004611af0565b610687565b6101bf6106ab565b61018b61021b3660046119e7565b6106b1565b6101bf610947565b61023061094d565b6040516101ae9190611ced565b6101a061024b366004611a84565b61095c565b610258610b33565b6040516101ae9190611d6b565b610230610b3c565b61018b61027b366004611b22565b610b4b565b61018b610c06565b61018b610296366004611ac7565b610c74565b610230610cf6565b61018b6102b1366004611b22565b610d05565b610230610d9c565b6101bf610dab565b6101bf610db1565b6101bf610db7565b6101bf610dbd565b61018b6102ec3660046119cd565b610dc3565b61018b6102ff366004611b22565b610e76565b61030c610edd565b6001600160a01b031661031d610cf6565b6001600160a01b031614610366576040805162461bcd60e51b81526020600482018190526024820152600080516020611eea833981519152604482015290519081900360640190fd5b60d18190556040517fe63c291a066613fe10359993ab33123d8c5985f14ae0ccdfd066c63d537e22969061039b908390611e59565b60405180910390a150565b6000806103b1610ee1565b600080306001600160a01b03168560008060006040516024016103d79493929190611d1c565b60408051601f198184030181529181526020820180516001600160e01b03166359cec45b60e01b1790525161040c9190611cb4565b600060405180830381855afa9150503d8060008114610447576040519150601f19603f3d011682016040523d82523d6000602084013e61044c565b606091505b5091509150816104775760405162461bcd60e51b815260040161046e90611e35565b60405180910390fd5b8080602001905181019061048b9190611b81565b90969095509350505050565b60006104a1610ee1565b60ce5460408051631b4bb46160e21b815290516000926001600160a01b031691636d2ed184916004808301926020929190829003018186803b1580156104e657600080fd5b505afa1580156104fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061051e9190611b3a565b90506105438161053d6305f5e10060d054610f2e90919063ffffffff16565b90610f90565b915060d1548211156105555760d15491505b5090565b610561610edd565b6001600160a01b0316610572610cf6565b6001600160a01b0316146105bb576040805162461bcd60e51b81526020600482018190526024820152600080516020611eea833981519152604482015290519081900360640190fd5b60d58190556040517fcf7f7495105ceec35e1d46b5a1330650da881193032a0a846d4c4d2e8d2993049061039b908390611e59565b6105f8610edd565b6001600160a01b0316610609610cf6565b6001600160a01b031614610652576040805162461bcd60e51b81526020600482018190526024820152600080516020611eea833981519152604482015290519081900360640190fd5b60d28190556040517f36a68bf905dcbd4092d259543b986b02346ebd9663aaacc168ba581b44d63f6c9061039b908390611e59565b600080610692610ee1565b61069f856001868661095c565b91509150935093915050565b60d25481565b600054610100900460ff16806106ca57506106ca610fd2565b806106d8575060005460ff16155b6107135760405162461bcd60e51b815260040180806020018281038252602e815260200180611f0a602e913960400191505060405180910390fd5b600054610100900460ff1615801561073e576000805460ff1961ff0019909116610100171660011790555b6001600160a01b038b1661075157600080fd5b6001600160a01b038a1661076457600080fd5b6001600160a01b03891661077757600080fd5b6001600160a01b03881661078a57600080fd5b6001600160a01b03871661079d57600080fd5b6001600160a01b0386166107b057600080fd5b6127108511156107bf57600080fd5b836107c957600080fd5b826107d357600080fd5b60c980546001600160a01b03808e166001600160a01b03199283161790925560ca80548d841690831617905560cc80548c841690831617905560cb80548b841690831617905560cd80548a841690831617905560ce80549289169290911691909117905560cf85905560d084905560d282905560d183905560d66020527fd2adaf2301c9e54b047b553c7ecb61fbf4f84d71709e2a227efec0843186585f805467ffffffffffffffff610fd8811667ffffffffffffffff19928316179092557f886dfc60b604b22bb13a98588ea769145fed7af5a173b3bc43a5ccc08e069d44805461107b8416908316179055600360008190527fc771c0b64b79fe531fb580e22ef07b485230fb2ccc56f1d5209f51eb1c30f125805461111e9094169390921692909217905560d355600a60d5556109156005670de0b6b3a7640000610f2e565b60d4556109206111c3565b610928611211565b801561093a576000805461ff00191690555b5050505050505050505050565b60d35481565b60ca546001600160a01b031681565b600080610967610ee1565b84158061097b575084801561097b57508315155b6109975760405162461bcd60e51b815260040161046e90611d98565b333014610a4d5760cc54604051630241d3fb60e11b81526000916001600160a01b031690630483a7f6906109cf903390600401611ced565b60006040518083038186803b1580156109e757600080fd5b505afa1580156109fb573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610a239190810190611ba4565b50509250505060d454811015610a4b5760405162461bcd60e51b815260040161046e90611dc0565b505b600080600080610a5b610497565b9050610a688a8a8961125f565b9750919550935091508215610a7f57809550610aa3565b8315610aa357610aa061271061053d60cf5487610f2e90919063ffffffff16565b95505b6000610ac9610ac2606461053d60d5548d610f2e90919063ffffffff16565b8a90611303565b905080871015610aeb5760405162461bcd60e51b815260040161046e90611e0a565b898015610af757508615155b15610b255783610b195760c954610b19906001600160a01b0316843088611345565b610b2333886113a5565b505b505050505094509492505050565b60975460ff1690565b60c9546001600160a01b031681565b610b53610edd565b6001600160a01b0316610b64610cf6565b6001600160a01b031614610bad576040805162461bcd60e51b81526020600482018190526024820152600080516020611eea833981519152604482015290519081900360640190fd5b61271060cf541115610bd15760405162461bcd60e51b815260040161046e90611d76565b60cf8190556040517fc6d3d93e80290ad8687918eb1cd28293fa9e658800d205f09a6d73d2d5e0fbdf9061039b908390611e59565b610c0e610edd565b6001600160a01b0316610c1f610cf6565b6001600160a01b031614610c68576040805162461bcd60e51b81526020600482018190526024820152600080516020611eea833981519152604482015290519081900360640190fd5b610c726000611517565b565b610c7c610edd565b6001600160a01b0316610c8d610cf6565b6001600160a01b031614610cd6576040805162461bcd60e51b81526020600482018190526024820152600080516020611eea833981519152604482015290519081900360640190fd5b610cf2610ce1610cf6565b6001600160a01b0384169083611569565b5050565b6065546001600160a01b031690565b610d0d610edd565b6001600160a01b0316610d1e610cf6565b6001600160a01b031614610d67576040805162461bcd60e51b81526020600482018190526024820152600080516020611eea833981519152604482015290519081900360640190fd5b60d08190556040517f27fed2da20a195ee831c4e78ce2bd0cfc4be23b636e8820121f147336084971e9061039b908390611e59565b60ce546001600160a01b031681565b60d05481565b60cf5481565b60d15481565b60d45481565b610dcb610edd565b6001600160a01b0316610ddc610cf6565b6001600160a01b031614610e25576040805162461bcd60e51b81526020600482018190526024820152600080516020611eea833981519152604482015290519081900360640190fd5b6001600160a01b038116610e6a5760405162461bcd60e51b8152600401808060200182810382526026815260200180611ea36026913960400191505060405180910390fd5b610e7381611517565b50565b610e7e610edd565b6001600160a01b0316610e8f610cf6565b6001600160a01b031614610ed8576040805162461bcd60e51b81526020600482018190526024820152600080516020611eea833981519152604482015290519081900360640190fd5b60d455565b3390565b610ee9610b33565b15610c72576040805162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015290519081900360640190fd5b600082610f3d57506000610f8a565b82820282848281610f4a57fe5b0414610f875760405162461bcd60e51b8152600401808060200182810382526021815260200180611ec96021913960400191505060405180910390fd5b90505b92915050565b6000610f8783836040518060400160405280601a81526020017f536166654d6174683a206469766973696f6e206279207a65726f0000000000008152506115c0565b303b1590565b60cc54604051637ab8955d60e01b8152600091829182916001600160a01b031690637ab8955d9061100f9088908890600401611d01565b6040805180830381600087803b15801561102857600080fd5b505af115801561103c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110609190611b52565b60cc5491979096506001600160a01b03909116945092505050565b60cd54604051637ab8955d60e01b8152600091829182916001600160a01b031690637ab8955d906110b29088908890600401611d01565b6040805180830381600087803b1580156110cb57600080fd5b505af11580156110df573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111039190611b52565b60cd5491979096506001600160a01b03909116945092505050565b60cc546040516323d0c81d60e21b8152600091829182916001600160a01b031690638f432074906111559088908890600401611d01565b602060405180830381600087803b15801561116f57600080fd5b505af1158015611183573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111a79190611b3a565b60cc549096600096506001600160a01b03909116945092505050565b600054610100900460ff166112095760405162461bcd60e51b815260040180806020018281038252602b815260200180611f38602b913960400191505060405180910390fd5b610c72611662565b600054610100900460ff166112575760405162461bcd60e51b815260040180806020018281038252602b815260200180611f38602b913960400191505060405180910390fd5b610c726116b8565b6000808080841561129f57600085815260d66020526040902054611290908890889080156119b4021763ffffffff16565b919550935091508490506112fa565b60015b60d35481116112f857600081815260d660205260409020546112d1908990899080156119b4021763ffffffff16565b91965094509250841515806112e35750835b156112f0578091506112f8565b6001016112a2565b505b93509350935093565b6000610f8783836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f77000081525061170a565b604080516001600160a01b0380861660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b17905261139f908590611764565b50505050565b6000816113b457506000610f8a565b60c9546040516370a0823160e01b81526000916001600160a01b0316906370a08231906113e5903090600401611ced565b60206040518083038186803b1580156113fd57600080fd5b505afa158015611411573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114359190611b3a565b905080831115611483577fe18877e49d8a98b9748ce4fc0451f1f2f20afbd428aa2f5d5cbbed3ba2d47b228160405161146e9190611e59565b60405180910390a161147e61191b565b611510565b60cb5460c9546114a0916001600160a01b03918216911685611569565b60cb546040516334686fad60e21b81526001600160a01b039091169063d1a1beb4906114d59087908790600190600401611d48565b600060405180830381600087803b1580156114ef57600080fd5b505af1158015611503573d6000803e3d6000fd5b5050505082915050610f8a565b5092915050565b606580546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b1790526115bb908490611764565b505050565b6000818361164c5760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b838110156116115781810151838201526020016115f9565b50505050905090810190601f16801561163e5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50600083858161165857fe5b0495945050505050565b600054610100900460ff166116a85760405162461bcd60e51b815260040180806020018281038252602b815260200180611f38602b913960400191505060405180910390fd5b610c726116b3610edd565b611517565b600054610100900460ff166116fe5760405162461bcd60e51b815260040180806020018281038252602b815260200180611f38602b913960400191505060405180910390fd5b6097805460ff19169055565b6000818484111561175c5760405162461bcd60e51b81526020600482018181528351602484015283519092839260449091019190850190808383600083156116115781810151838201526020016115f9565b505050900390565b611776826001600160a01b0316611976565b6117c7576040805162461bcd60e51b815260206004820152601f60248201527f5361666545524332303a2063616c6c20746f206e6f6e2d636f6e747261637400604482015290519081900360640190fd5b600080836001600160a01b0316836040518082805190602001908083835b602083106118045780518252601f1990920191602091820191016117e5565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d8060008114611866576040519150601f19603f3d011682016040523d82523d6000602084013e61186b565b606091505b5091509150816118c2576040805162461bcd60e51b815260206004820181905260248201527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564604482015290519081900360640190fd5b80511561139f578080602001905160208110156118de57600080fd5b505161139f5760405162461bcd60e51b815260040180806020018281038252602a815260200180611f63602a913960400191505060405180910390fd5b611923610ee1565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611959610edd565b604080516001600160a01b039092168252519081900360200190a1565b6000813f7fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4708181148015906119aa57508115155b925050505b919050565bfe5b80356001600160a01b03811681146119af57600080fd5b6000602082840312156119de578081fd5b610f87826119b6565b6000806000806000806000806000806101408b8d031215611a06578586fd5b611a0f8b6119b6565b9950611a1d60208c016119b6565b9850611a2b60408c016119b6565b9750611a3960608c016119b6565b9650611a4760808c016119b6565b9550611a5560a08c016119b6565b945060c08b0135935060e08b013592506101008b013591506101208b013590509295989b9194979a5092959850565b60008060008060808587031215611a99578384fd5b611aa2856119b6565b93506020850135611ab281611e94565b93969395505050506040820135916060013590565b60008060408385031215611ad9578182fd5b611ae2836119b6565b946020939093013593505050565b600080600060608486031215611b04578283fd5b611b0d846119b6565b95602085013595506040909401359392505050565b600060208284031215611b33578081fd5b5035919050565b600060208284031215611b4b578081fd5b5051919050565b60008060408385031215611b64578182fd5b825191506020830151611b7681611e94565b809150509250929050565b60008060408385031215611b93578182fd5b505080516020909101519092909150565b600080600080600060a08688031215611bbb578081fd5b8551945060208087015194506040870151935060608701519250608087015167ffffffffffffffff80821115611bef578384fd5b818901915089601f830112611c02578384fd5b815181811115611c0e57fe5b611c1b8485830201611e70565b8181528481019084860160808402860187018e1015611c38578788fd5b8795505b83861015611ca0576080818f031215611c53578788fd5b604051608081018181108782111715611c6857fe5b604090815282518252888301518983015282810151908201526060808301519082015283526001959095019491860191608001611c3c565b508096505050505050509295509295909350565b60008251815b81811015611cd45760208186018101518583015201611cba565b81811115611ce25782828501525b509190910192915050565b6001600160a01b0391909116815260200190565b6001600160a01b039290921682521515602082015260400190565b6001600160a01b03949094168452911515602084015260ff908116604084015216606082015260800190565b6001600160a01b0393909316835260208301919091521515604082015260600190565b901515815260200190565b6020808252600890820152676f7665727269646560c01b604082015260600190565b6020808252600e908201526d1c5d5bdd19481c995c5d5a5c995960921b604082015260600190565b6020808252602a908201527f4e6f20656e6f75676820444c502062616c616e636520746f2062652061626c6560408201526920746f20626f756e747960b01b606082015260800190565b602080825260119082015270746f6f206d75636820736c69707061676560781b604082015260600190565b6020808252600a90820152691c5d5bdd194819985a5b60b21b604082015260600190565b90815260200190565b918252602082015260400190565b60405181810167ffffffffffffffff81118282101715611e8c57fe5b604052919050565b8015158114610e7357600080fdfe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f774f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572436f6e747261637420696e7374616e63652068617320616c7265616479206265656e20696e697469616c697a6564496e697469616c697a61626c653a20636f6e7472616374206973206e6f7420696e697469616c697a696e675361666545524332303a204552433230206f7065726174696f6e20646964206e6f742073756363656564a26469706673582212200d2d187f32cb67f96ca71575dfb387a8277d6d5b4acb17ae1bf5153a53a18dda64736f6c63430007060033';

type BountyManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BountyManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BountyManager__factory extends ContractFactory {
  constructor(...args: BountyManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BountyManager> {
    return super.deploy(overrides || {}) as Promise<BountyManager>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): BountyManager {
    return super.attach(address) as BountyManager;
  }
  override connect(signer: Signer): BountyManager__factory {
    return super.connect(signer) as BountyManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BountyManagerInterface {
    return new utils.Interface(_abi) as BountyManagerInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): BountyManager {
    return new Contract(address, _abi, signerOrProvider) as BountyManager;
  }
}

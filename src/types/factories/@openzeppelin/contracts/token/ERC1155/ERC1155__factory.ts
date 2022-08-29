/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  ERC1155,
  ERC1155Interface,
} from "../../../../../@openzeppelin/contracts/token/ERC1155/ERC1155";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200191e3803806200191e83398101604081905262000034916200011b565b6200003f8162000046565b5062000233565b80516200005b9060029060208401906200005f565b5050565b8280546200006d90620001f7565b90600052602060002090601f016020900481019282620000915760008555620000dc565b82601f10620000ac57805160ff1916838001178555620000dc565b82800160010185558215620000dc579182015b82811115620000dc578251825591602001919060010190620000bf565b50620000ea929150620000ee565b5090565b5b80821115620000ea5760008155600101620000ef565b634e487b7160e01b600052604160045260246000fd5b600060208083850312156200012f57600080fd5b82516001600160401b03808211156200014757600080fd5b818501915085601f8301126200015c57600080fd5b81518181111562000171576200017162000105565b604051601f8201601f19908116603f011681019083821181831017156200019c576200019c62000105565b816040528281528886848701011115620001b557600080fd5b600093505b82841015620001d95784840186015181850187015292850192620001ba565b82841115620001eb5760008684830101525b98975050505050505050565b600181811c908216806200020c57607f821691505b6020821081036200022d57634e487b7160e01b600052602260045260246000fd5b50919050565b6116db80620002436000396000f3fe608060405234801561001057600080fd5b50600436106100875760003560e01c80634e1273f41161005b5780634e1273f41461010a578063a22cb4651461012a578063e985e9c51461013d578063f242432a1461017957600080fd5b8062fdd58e1461008c57806301ffc9a7146100b25780630e89341c146100d55780632eb2c2d6146100f5575b600080fd5b61009f61009a366004610f8d565b61018c565b6040519081526020015b60405180910390f35b6100c56100c0366004610fe8565b610235565b60405190151581526020016100a9565b6100e86100e336600461100c565b61031a565b6040516100a99190611072565b6101086101033660046111d1565b6103ae565b005b61011d61011836600461127b565b610450565b6040516100a99190611381565b610108610138366004611394565b61058e565b6100c561014b3660046113d0565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b610108610187366004611403565b61059d565b60006001600160a01b03831661020f5760405162461bcd60e51b815260206004820152602b60248201527f455243313135353a2062616c616e636520717565727920666f7220746865207a60448201527f65726f206164647265737300000000000000000000000000000000000000000060648201526084015b60405180910390fd5b506000908152602081815260408083206001600160a01b03949094168352929052205490565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fd9b67a260000000000000000000000000000000000000000000000000000000014806102c857507fffffffff0000000000000000000000000000000000000000000000000000000082167f0e89341c00000000000000000000000000000000000000000000000000000000145b8061031457507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b92915050565b60606002805461032990611468565b80601f016020809104026020016040519081016040528092919081815260200182805461035590611468565b80156103a25780601f10610377576101008083540402835291602001916103a2565b820191906000526020600020905b81548152906001019060200180831161038557829003601f168201915b50505050509050919050565b6001600160a01b0385163314806103ca57506103ca853361014b565b61043c5760405162461bcd60e51b815260206004820152603260248201527f455243313135353a207472616e736665722063616c6c6572206973206e6f742060448201527f6f776e6572206e6f7220617070726f76656400000000000000000000000000006064820152608401610206565b6104498585858585610638565b5050505050565b606081518351146104c95760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e67746860448201527f206d69736d6174636800000000000000000000000000000000000000000000006064820152608401610206565b6000835167ffffffffffffffff8111156104e5576104e5611085565b60405190808252806020026020018201604052801561050e578160200160208202803683370190505b50905060005b845181101561058657610559858281518110610532576105326114a2565b602002602001015185838151811061054c5761054c6114a2565b602002602001015161018c565b82828151811061056b5761056b6114a2565b602090810291909101015261057f816114ce565b9050610514565b509392505050565b6105993383836108d6565b5050565b6001600160a01b0385163314806105b957506105b9853361014b565b61062b5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260448201527f20617070726f76656400000000000000000000000000000000000000000000006064820152608401610206565b61044985858585856109e8565b81518351146106af5760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060448201527f6d69736d617463680000000000000000000000000000000000000000000000006064820152608401610206565b6001600160a01b03841661072b5760405162461bcd60e51b815260206004820152602560248201527f455243313135353a207472616e7366657220746f20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610206565b3360005b845181101561086857600085828151811061074c5761074c6114a2565b60200260200101519050600085838151811061076a5761076a6114a2565b602090810291909101810151600084815280835260408082206001600160a01b038e1683529093529190912054909150818110156108105760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60448201527f72207472616e73666572000000000000000000000000000000000000000000006064820152608401610206565b6000838152602081815260408083206001600160a01b038e8116855292528083208585039055908b1682528120805484929061084d908490611506565b9250508190555050505080610861906114ce565b905061072f565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb87876040516108b892919061151e565b60405180910390a46108ce818787878787610bbe565b505050505050565b816001600160a01b0316836001600160a01b03160361095d5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c2073746174757360448201527f20666f722073656c6600000000000000000000000000000000000000000000006064820152608401610206565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b038416610a645760405162461bcd60e51b815260206004820152602560248201527f455243313135353a207472616e7366657220746f20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610206565b336000610a7085610dcb565b90506000610a7d85610dcb565b90506000868152602081815260408083206001600160a01b038c16845290915290205485811015610b165760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60448201527f72207472616e73666572000000000000000000000000000000000000000000006064820152608401610206565b6000878152602081815260408083206001600160a01b038d8116855292528083208985039055908a16825281208054889290610b53908490611506565b909155505060408051888152602081018890526001600160a01b03808b16928c821692918816917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4610bb3848a8a8a8a8a610e16565b505050505050505050565b6001600160a01b0384163b156108ce576040517fbc197c810000000000000000000000000000000000000000000000000000000081526001600160a01b0385169063bc197c8190610c1b908990899088908890889060040161154c565b6020604051808303816000875af1925050508015610c56575060408051601f3d908101601f19168201909252610c53918101906115aa565b60015b610d0b57610c626115c7565b806308c379a003610c9b5750610c766115e3565b80610c815750610c9d565b8060405162461bcd60e51b81526004016102069190611072565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e204552433131353560448201527f526563656976657220696d706c656d656e7465720000000000000000000000006064820152608401610206565b7fffffffff0000000000000000000000000000000000000000000000000000000081167fbc197c810000000000000000000000000000000000000000000000000000000014610dc25760405162461bcd60e51b815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a6563746560448201527f6420746f6b656e730000000000000000000000000000000000000000000000006064820152608401610206565b50505050505050565b60408051600180825281830190925260609160009190602080830190803683370190505090508281600081518110610e0557610e056114a2565b602090810291909101015292915050565b6001600160a01b0384163b156108ce576040517ff23a6e610000000000000000000000000000000000000000000000000000000081526001600160a01b0385169063f23a6e6190610e73908990899088908890889060040161168b565b6020604051808303816000875af1925050508015610eae575060408051601f3d908101601f19168201909252610eab918101906115aa565b60015b610eba57610c626115c7565b7fffffffff0000000000000000000000000000000000000000000000000000000081167ff23a6e610000000000000000000000000000000000000000000000000000000014610dc25760405162461bcd60e51b815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a6563746560448201527f6420746f6b656e730000000000000000000000000000000000000000000000006064820152608401610206565b80356001600160a01b0381168114610f8857600080fd5b919050565b60008060408385031215610fa057600080fd5b610fa983610f71565b946020939093013593505050565b7fffffffff0000000000000000000000000000000000000000000000000000000081168114610fe557600080fd5b50565b600060208284031215610ffa57600080fd5b813561100581610fb7565b9392505050565b60006020828403121561101e57600080fd5b5035919050565b6000815180845260005b8181101561104b5760208185018101518683018201520161102f565b8181111561105d576000602083870101525b50601f01601f19169290920160200192915050565b6020815260006110056020830184611025565b634e487b7160e01b600052604160045260246000fd5b601f19601f830116810181811067ffffffffffffffff821117156110c1576110c1611085565b6040525050565b600067ffffffffffffffff8211156110e2576110e2611085565b5060051b60200190565b600082601f8301126110fd57600080fd5b8135602061110a826110c8565b604051611117828261109b565b83815260059390931b850182019282810191508684111561113757600080fd5b8286015b84811015611152578035835291830191830161113b565b509695505050505050565b600082601f83011261116e57600080fd5b813567ffffffffffffffff81111561118857611188611085565b60405161119f6020601f19601f850116018261109b565b8181528460208386010111156111b457600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a086880312156111e957600080fd5b6111f286610f71565b945061120060208701610f71565b9350604086013567ffffffffffffffff8082111561121d57600080fd5b61122989838a016110ec565b9450606088013591508082111561123f57600080fd5b61124b89838a016110ec565b9350608088013591508082111561126157600080fd5b5061126e8882890161115d565b9150509295509295909350565b6000806040838503121561128e57600080fd5b823567ffffffffffffffff808211156112a657600080fd5b818501915085601f8301126112ba57600080fd5b813560206112c7826110c8565b6040516112d4828261109b565b83815260059390931b85018201928281019150898411156112f457600080fd5b948201945b838610156113195761130a86610f71565b825294820194908201906112f9565b9650508601359250508082111561132f57600080fd5b5061133c858286016110ec565b9150509250929050565b600081518084526020808501945080840160005b838110156113765781518752958201959082019060010161135a565b509495945050505050565b6020815260006110056020830184611346565b600080604083850312156113a757600080fd5b6113b083610f71565b9150602083013580151581146113c557600080fd5b809150509250929050565b600080604083850312156113e357600080fd5b6113ec83610f71565b91506113fa60208401610f71565b90509250929050565b600080600080600060a0868803121561141b57600080fd5b61142486610f71565b945061143260208701610f71565b93506040860135925060608601359150608086013567ffffffffffffffff81111561145c57600080fd5b61126e8882890161115d565b600181811c9082168061147c57607f821691505b60208210810361149c57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036114ff576114ff6114b8565b5060010190565b60008219821115611519576115196114b8565b500190565b6040815260006115316040830185611346565b82810360208401526115438185611346565b95945050505050565b60006001600160a01b03808816835280871660208401525060a0604083015261157860a0830186611346565b828103606084015261158a8186611346565b9050828103608084015261159e8185611025565b98975050505050505050565b6000602082840312156115bc57600080fd5b815161100581610fb7565b600060033d11156115e05760046000803e5060005160e01c5b90565b600060443d10156115f15790565b6040517ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc803d016004833e81513d67ffffffffffffffff816024840111818411171561163f57505050505090565b82850191508151818111156116575750505050505090565b843d87010160208285010111156116715750505050505090565b6116806020828601018761109b565b509095945050505050565b60006001600160a01b03808816835280871660208401525084604083015283606083015260a060808301526116c360a0830184611025565b97965050505050505056fea164736f6c634300080d000a";

type ERC1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155__factory extends ContractFactory {
  constructor(...args: ERC1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    uri_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC1155> {
    return super.deploy(uri_, overrides || {}) as Promise<ERC1155>;
  }
  override getDeployTransaction(
    uri_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(uri_, overrides || {});
  }
  override attach(address: string): ERC1155 {
    return super.attach(address) as ERC1155;
  }
  override connect(signer: Signer): ERC1155__factory {
    return super.connect(signer) as ERC1155__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155Interface {
    return new utils.Interface(_abi) as ERC1155Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155 {
    return new Contract(address, _abi, signerOrProvider) as ERC1155;
  }
}
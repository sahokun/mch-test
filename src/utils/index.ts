/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type BN from "bn.js";
import type {
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "../types/abi/types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type Approval = ContractEventLog<{
  owner: string;
  spender: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;
export type MetaTransactionExecuted = ContractEventLog<{
  userAddress: string;
  relayerAddress: string;
  functionSignature: string;
  0: string;
  1: string;
  2: string;
}>;
export type RoleAdminChanged = ContractEventLog<{
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
  0: string;
  1: string;
  2: string;
}>;
export type RoleGranted = ContractEventLog<{
  role: string;
  account: string;
  sender: string;
  0: string;
  1: string;
  2: string;
}>;
export type RoleRevoked = ContractEventLog<{
  role: string;
  account: string;
  sender: string;
  0: string;
  1: string;
  2: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  value: string;
  0: string;
  1: string;
  2: string;
}>;

export interface Erc20 extends BaseContract {
  methods: {
    allowance(
      owner: string,
      spender: string
    ): NonPayableTransactionObject<string>;

    approve(
      spender: string,
      amount: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    balanceOf(account: string): NonPayableTransactionObject<string>;

    decimals(): NonPayableTransactionObject<string>;

    symbol(): NonPayableTransactionObject<string>;

    totalSupply(): NonPayableTransactionObject<string>;
  };
}

export class ContractErc20Wrapper {
  contract: Erc20;
  constructor(contract: Erc20) {
    this.contract = contract;
  }
  async balanceOf(address: string) {
    const balanceWei = await this.contract.methods.balanceOf(address).call();
    console.log(`balanceWei: ${balanceWei}`);
    return balanceWei;
  }
  async totalSupply() {
    const totalSupply = await this.contract.methods.totalSupply().call();
    console.log(`totalSupply: ${totalSupply}`);
    return totalSupply;
  }
}
import type Web3 from "web3";
import { FMT_NUMBER, FMT_BYTES, type ContractAbi } from "web3";
import WethJson from "../../types/json/weth.json";
import type { Erc20 } from "../index";

const abi = WethJson.abi as unknown as ContractAbi;
const contractAddress = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";

export const contractFactory = (web3: Web3) => {
  const contract = new web3.eth.Contract(abi, contractAddress, {
    number: FMT_NUMBER.STR,
    bytes: FMT_BYTES.HEX,
  }) as unknown as Erc20;
  return contract;
};

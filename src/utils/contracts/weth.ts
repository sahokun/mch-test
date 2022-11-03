import type Web3 from "web3";
import WethJson from "../../types/json/weth.json";
import type { Weth } from "../../types/abi/Weth";
import type { AbiItem } from "web3-utils";
import type { Erc20 } from "..";

const abi = WethJson.abi as any as AbiItem;
const contractAddress = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619";

export const contractFactory = (web3: Web3) => {
  const contract = new web3.eth.Contract(
    abi,
    contractAddress
  ) as unknown as Weth;
  return contract;
};

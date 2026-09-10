import type Web3 from "web3";
import { FMT_NUMBER, FMT_BYTES, type ContractAbi } from "web3";
import MchcJson from "../../types/json/mchc.json";
import type { Erc20 } from "../index";

const abi = MchcJson.abi as unknown as ContractAbi;
const contractAddress = "0xee7666aACAEFaa6efeeF62ea40176d3eB21953B9";

export const contractFactory = (web3: Web3) => {
  const contract = new web3.eth.Contract(abi, contractAddress, {
    number: FMT_NUMBER.STR,
    bytes: FMT_BYTES.HEX,
  }) as unknown as Erc20;
  return contract;
};

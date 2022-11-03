import type Web3 from "web3";
import MchcJson from "../../types/json/mchc.json";
import type { Mchc } from "../../types/abi/Mchc";
import type { AbiItem } from "web3-utils";

const abi = MchcJson.abi as any as AbiItem;
const contractAddress = "0xee7666aACAEFaa6efeeF62ea40176d3eB21953B9";

export const contractFactory = (web3: Web3) => {
  const contract = new web3.eth.Contract(
    abi,
    contractAddress
  ) as unknown as Mchc;
  return contract;
};

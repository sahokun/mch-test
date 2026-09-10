import type Web3 from "web3";
import { FMT_NUMBER, FMT_BYTES, type ContractAbi } from "web3";
import QuickSwapWethMchcJson from "../../types/json/quickswap-weth-mchc.json";
import type { Erc20 } from "../index";

const abi = QuickSwapWethMchcJson.abi as unknown as ContractAbi;
const contractAddress = "0xe90056B377CbbB477E3950505cCBD8d00B9cDc75";

export const contractFactory = (web3: Web3) => {
  const contract = new web3.eth.Contract(abi, contractAddress, {
    number: FMT_NUMBER.STR,
    bytes: FMT_BYTES.HEX,
  }) as unknown as Erc20;
  return contract;
};

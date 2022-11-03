import type Web3 from "web3";
import QuickSwapWethMchcJson from "../../types/json/quickswap-weth-mchc.json";
import type { QuickswapWethMchc } from "../../types/abi/QuickswapWethMchc";
import type { AbiItem } from "web3-utils";

const abi = QuickSwapWethMchcJson.abi as any as AbiItem;
const contractAddress = "0xe90056B377CbbB477E3950505cCBD8d00B9cDc75";

export const contractFactory = (web3: Web3) => {
  const contract = new web3.eth.Contract(
    abi,
    contractAddress
  ) as unknown as QuickswapWethMchc;
  return contract;
};

<template>
  <div>
    <h1>10 * 110.5 * √(MCHC/ETH)</h1>
    <hr />
    <div>
      <p>{{ text1 }}</p>
      <p>{{ text2 }}</p>
      <p>{{ text3 }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import Web3 from "web3";
import { Decimal } from "decimal.js";
import * as ContractWeth from "../utils/contracts/weth";
import * as ContractMchc from "../utils/contracts/mchc";
import * as ContractQuickswapWethMchc from "../utils/contracts/quickswap-weth-mchc";
import { ContractErc20Wrapper } from "../utils";
// import { date } from "date-fns";
const text1 = ref<string>("");
const text2 = ref<string>("");
const text3 = ref<string>("");

const web3 = new Web3(
  new Web3.providers.HttpProvider(`https://polygon-rpc.com`)
);

const contractWeth = new ContractErc20Wrapper(
  ContractWeth.contractFactory(web3)
);
const contractMchc = new ContractErc20Wrapper(
  ContractMchc.contractFactory(web3)
);
const contractQuickswapWethMchc = new ContractErc20Wrapper(
  ContractQuickswapWethMchc.contractFactory(web3)
);

// web3.eth.defaultBlock = 34710441;

const walletAddressUniV2 = "0xe90056B377CbbB477E3950505cCBD8d00B9cDc75";

const getBalance = async () => {
  const balanceWethWei = await contractWeth.balanceOf(walletAddressUniV2);
  const balanceWeth = web3.utils.fromWei(balanceWethWei, "ether");
  console.log(balanceWeth);

  const balanceMchcWei = await contractMchc.balanceOf(walletAddressUniV2);
  const balanceMchc = web3.utils.fromWei(balanceMchcWei, "ether");
  console.log(balanceMchc);

  const totalSupplyWethMchcWei = await contractQuickswapWethMchc.totalSupply();
  const totalSupplyWethMchc = web3.utils.fromWei(
    totalSupplyWethMchcWei,
    "ether"
  );
  console.log(totalSupplyWethMchc);

  const totalSupplyWethMchcWeiDecimal = new Decimal(totalSupplyWethMchcWei);

  const balanceWethWeiDecimal = new Decimal(balanceWethWei);
  const weth1lp = balanceWethWeiDecimal.div(totalSupplyWethMchcWeiDecimal);
  const weth100lp = weth1lp.mul(100);

  const balanceMchcWeiDecimal = new Decimal(balanceMchcWei);
  const mchc1lp = balanceMchcWeiDecimal.div(totalSupplyWethMchcWeiDecimal);
  const mchc100lp = mchc1lp.mul(100);

  const vpOf100lp = balanceMchcWeiDecimal
    .div(totalSupplyWethMchcWeiDecimal)
    .mul(100)
    .mul(10)
    .toFixed(0);

  text1.value = `1LP = ${weth1lp.toFixed(6)}ETH+${mchc1lp.toFixed(4)}MCHC`;
  text2.value = `100LP = ${weth100lp.toFixed(4)}ETH+${mchc100lp.toFixed(
    2
  )}MCHC`;
  text3.value = `100LP VP = ${vpOf100lp}`;
  // text3.value = `100LPVP(MAX) = ${vpOf100lp}`;
};

getBalance();
</script>
<style></style>

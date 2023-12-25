<template>
  <div>
    <h1>Balance Checker</h1>
    <hr />
    <div>
      <button
        class="btn"
        type="button"
        @click.prevent="enablePolygonDatetimePicker"
      >
        Enable Datetime Picker(Polygon)
      </button>
    </div>
    <div v-if="isActivePolygon">
      <div>
        APIKEY<input
          class="form-control input-block"
          type="datetime"
          v-model="apiKey"
        />
      </div>
      Datetime
      <Datepicker v-model="sourceDatetime" inline autoApply></Datepicker>
      Datetime {{ sourceDatetime.toString() }}
      <button class="btn" type="button" @click.prevent="setBlockNumber">
        Set BlockNumber
      </button>
    </div>
    <hr />
    <div>
      RPC<input
        class="form-control input-block"
        type="datetime"
        v-model="sourceRpc"
      />
    </div>
    <div>Block<input type="text" v-model="blockNumber" /></div>
    <div>
      Account Address<input
        class="form-control input-block"
        type="text"
        v-model="targetAddress"
      />
    </div>
    <div>
      Erc20 Token Address<input
        class="form-control input-block"
        type="text"
        v-model="targetTokenAddress"
      />
    </div>
    <button class="btn" type="button" @click.prevent="getBalance">
      Get Balance
    </button>
    <div>
      <pre
        v-for="(outputOne, index) in output"
        :key="index"
      ><code>{{ outputOne }}</code></pre>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import Web3 from "web3";
import { ContractErc20Wrapper } from "../utils";
import Erc20Json from "../types/json/erc20.json";
import type { Erc20 } from "../types/abi/Erc20";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";
import type { AbiItem } from "web3-utils";
import { Decimal } from "decimal.js";
const isActivePolygon = ref<boolean>(false);
const apiKey = ref<string>("");
const sourceRpc = ref<string>("https://polygon-rpc.com");
const sourceDatetime = ref<Date>(new Date());
const blockNumber = ref<string>("latest");
const targetAddress = ref<string>("0x9863abbfbb3c5926FAA6338e5F8c324F976e1FE9");
const targetTokenAddress = ref<string>(
  "0xee7666aACAEFaa6efeeF62ea40176d3eB21953B9"
);
const output = ref<string[]>([]);

const clearOutput = () => {
  output.value = [];
};

const appendOutput = (text: string) => {
  output.value.push(text);
};
const enablePolygonDatetimePicker = () => {
  isActivePolygon.value = !isActivePolygon.value;
};
const setBlockNumber = async () => {
  const unixtime = sourceDatetime.value.getTime() / 1000;
  console.log(unixtime);
  const url = `https://api.polygonscan.com/api?module=block&action=getblocknobytime&timestamp=${unixtime}&closest=before&apikey=${apiKey.value}`;

  const aaa = await axios.get(url);
  console.log(aaa.data.result);
  blockNumber.value = aaa.data.result;
};

const getBalance = async () => {
  clearOutput();
  const web3 = new Web3(new Web3.providers.HttpProvider(`${sourceRpc.value}`));
  web3.eth.defaultBlock = blockNumber.value;

  const abi = Erc20Json.abi as any as AbiItem;
  const contractErc20Raw = new web3.eth.Contract(
    abi,
    targetTokenAddress.value
  ) as unknown as Erc20;
  const contractErc20 = new ContractErc20Wrapper(contractErc20Raw);

  const defaultBlock = await web3.eth.defaultBlock;
  appendOutput(`BlockNumber:\t${String(defaultBlock)}`);
  const chainId = await web3.eth.getChainId();
  appendOutput(`ChainId:\t${String(chainId)}`);

  const balanceNativeWei = await web3.eth.getBalance(targetAddress.value);
  const balanceNative = web3.utils.fromWei(balanceNativeWei, "ether");
  appendOutput(`Balance Native:\t${String(balanceNative)}`);
  const symbolErc20 = await contractErc20.symbol();
  const decimalsErc20 = await contractErc20.decimals();
  const decimalsErc20PowNumber = 10 ** Number(decimalsErc20);
  const balanceErc20Digits = await contractErc20.balanceOf(targetAddress.value);
  const balanceErc20DigitsDecimal = new Decimal(balanceErc20Digits);
  const balanceErc20Decimal = balanceErc20DigitsDecimal.div(
    new Decimal(decimalsErc20PowNumber)
  );
  appendOutput(`Balance ${symbolErc20}:\t${String(balanceErc20Decimal)}`);
};
</script>
<style></style>

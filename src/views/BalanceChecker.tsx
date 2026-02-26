import React, { useState } from "react";
import Web3 from "web3";
import { ContractErc20Wrapper } from "../utils";
import Erc20Json from "../types/json/erc20.json";
import type { Erc20 } from "../types/abi/Erc20";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import type { AbiItem } from "web3-utils";
import { Decimal } from "decimal.js";
import { CHAINS, CHAINS_MAP, CUSTOM_CHAIN_VALUE } from "../config/chains";

export default function BalanceChecker() {
  const [selectedChainValue, setSelectedChainValue] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [sourceRpc, setSourceRpc] = useState<string>("");
  const [sourceDatetime, setSourceDatetime] = useState<Date>(new Date());
  const [blockNumber, setBlockNumber] = useState<string>("latest");
  const [targetAddress, setTargetAddress] = useState<string>("0x9863abbfbb3c5926FAA6338e5F8c324F976e1FE9");
  const [targetTokenAddress, setTargetTokenAddress] = useState<string>(
    "0xee7666aACAEFaa6efeeF62ea40176d3eB21953B9"
  );
  const [output, setOutput] = useState<string[]>([]);

  const selectedChain =
    selectedChainValue && selectedChainValue !== CUSTOM_CHAIN_VALUE
      ? (CHAINS_MAP[selectedChainValue] ?? null)
      : null;

  const showDatePicker = selectedChain !== null;

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    date.setHours(
      sourceDatetime.getHours(),
      sourceDatetime.getMinutes(),
      sourceDatetime.getSeconds()
    );
    setSourceDatetime(date);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [h, m, s] = e.target.value.split(":").map(Number);
    const updated = new Date(sourceDatetime);
    updated.setHours(h ?? 0, m ?? 0, s ?? 0);
    setSourceDatetime(updated);
  };

  const timeValue = [
    String(sourceDatetime.getHours()).padStart(2, "0"),
    String(sourceDatetime.getMinutes()).padStart(2, "0"),
    String(sourceDatetime.getSeconds()).padStart(2, "0"),
  ].join(":");

  const clearOutput = () => {
    setOutput([]);
  };

  const appendOutput = (text: string) => {
    setOutput((prev) => [...prev, text]);
  };

  const handleChainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedChainValue(value);
    if (value && value !== CUSTOM_CHAIN_VALUE) {
      setSourceRpc(CHAINS_MAP[value]?.defaultRpc ?? "");
    } else if (value === CUSTOM_CHAIN_VALUE) {
      setSourceRpc("");
    }
  };

  const handleSetBlockNumber = async () => {
    if (!selectedChain) return;
    const unixtime = Math.floor(sourceDatetime.getTime() / 1000);
    const url = `https://api.etherscan.io/v2/api?chainid=${selectedChain.chainId}&module=block&action=getblocknobytime&timestamp=${unixtime}&closest=before&apikey=${apiKey}`;
    const res = await axios.get(url);
    setBlockNumber(res.data.result);
  };

  const getBalance = async () => {
    clearOutput();
    const web3 = new Web3(new Web3.providers.HttpProvider(sourceRpc));
    web3.eth.defaultBlock = blockNumber;

    const abi = Erc20Json.abi as any as AbiItem;
    const contractErc20Raw = new web3.eth.Contract(
      abi,
      targetTokenAddress
    ) as unknown as Erc20;
    const contractErc20 = new ContractErc20Wrapper(contractErc20Raw);

    const defaultBlock = web3.eth.defaultBlock;
    appendOutput(`BlockNumber:\t${String(defaultBlock)}`);
    const chainId = await web3.eth.getChainId();
    appendOutput(`ChainId:\t${String(chainId)}`);

    const balanceNativeWei = await web3.eth.getBalance(targetAddress);
    const balanceNative = web3.utils.fromWei(balanceNativeWei, "ether");
    const nativeSymbol = CHAINS_MAP[String(chainId)]?.nativeSymbol ?? "Native";
    appendOutput(`Balance ${nativeSymbol}:\t${String(balanceNative)}`);
    try {
      const symbolErc20 = await contractErc20.symbol();
      const decimalsErc20 = await contractErc20.decimals();
      const decimalsErc20PowNumber = 10 ** Number(decimalsErc20);
      const balanceErc20Digits = await contractErc20.balanceOf(targetAddress);
      const balanceErc20DigitsDecimal = new Decimal(balanceErc20Digits);
      const balanceErc20Decimal = balanceErc20DigitsDecimal.div(
        new Decimal(decimalsErc20PowNumber)
      );
      appendOutput(`Balance ${symbolErc20}:\t${String(balanceErc20Decimal)}`);
    } catch {
      appendOutput(`Balance ERC20:\tエラー（${targetTokenAddress} はERC20コントラクトではないか存在しません）`);
    }
  };

  return (
    <div>
      <h1>Balance Checker</h1>
      <hr />

      {/* Chain セクション */}
      <div>
        <label>Chain</label>
        <select
          className="form-control input-block"
          value={selectedChainValue}
          onChange={handleChainChange}
        >
          <option value="" disabled>Select chain...</option>
          {CHAINS.map((chain) => (
            <option key={chain.chainId} value={String(chain.chainId)}>
              {chain.name}
            </option>
          ))}
          <option value={CUSTOM_CHAIN_VALUE}>Custom (manual input)</option>
        </select>
      </div>
      <div>
        <label>RPC Endpoint</label>
        <input
          className="form-control input-block"
          type="text"
          value={sourceRpc}
          onChange={(e) => setSourceRpc(e.target.value)}
        />
      </div>

      <hr />

      {/* DatePicker セクション */}
      {showDatePicker && (
        <div>
          <div>
            <label>Etherscan API Key</label>
            <input
              className="form-control input-block"
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div>
            <label>Datetime</label>
            <DatePicker
              selected={sourceDatetime}
              onChange={handleDateChange}
              inline
            />
            <input
              type="time"
              step="1"
              className="form-control input-block"
              value={timeValue}
              onChange={handleTimeChange}
            />
          </div>
          <button className="btn" type="button" onClick={handleSetBlockNumber}>
            Set Block from Datetime
          </button>
        </div>
      )}

      <hr />

      {/* クエリ セクション */}
      <div>
        <label>Block Number</label>
        <input
          className="form-control input-block"
          type="text"
          value={blockNumber}
          onChange={(e) => setBlockNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Account Address</label>
        <input
          className="form-control input-block"
          type="text"
          value={targetAddress}
          onChange={(e) => setTargetAddress(e.target.value)}
        />
      </div>
      <div>
        <label>ERC20 Token Address</label>
        <input
          className="form-control input-block"
          type="text"
          value={targetTokenAddress}
          onChange={(e) => setTargetTokenAddress(e.target.value)}
        />
      </div>

      <hr />

      {/* 実行 */}
      <button className="btn" type="button" onClick={getBalance}>
        Get Balance
      </button>
      <div>
        {output.map((outputOne, index) => (
          <pre key={index}>
            <code>{outputOne}</code>
          </pre>
        ))}
      </div>
    </div>
  );
}

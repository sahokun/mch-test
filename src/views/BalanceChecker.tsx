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

export default function BalanceChecker() {
  const [isActivePolygon, setIsActivePolygon] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [sourceRpc, setSourceRpc] = useState<string>("https://polygon-rpc.com");
  const [sourceDatetime, setSourceDatetime] = useState<Date>(new Date());
  const [blockNumber, setBlockNumber] = useState<string>("latest");
  const [targetAddress, setTargetAddress] = useState<string>("0x9863abbfbb3c5926FAA6338e5F8c324F976e1FE9");
  const [targetTokenAddress, setTargetTokenAddress] = useState<string>(
    "0xee7666aACAEFaa6efeeF62ea40176d3eB21953B9"
  );
  const [output, setOutput] = useState<string[]>([]);

  const clearOutput = () => {
    setOutput([]);
  };

  const appendOutput = (text: string) => {
    setOutput((prev) => [...prev, text]);
  };

  const enablePolygonDatetimePicker = () => {
    setIsActivePolygon((prev) => !prev);
  };

  const handleSetBlockNumber = async () => {
    const unixtime = sourceDatetime.getTime() / 1000;
    console.log(unixtime);
    const url = `https://api.etherscan.io/v2/api?chainid=137&module=block&action=getblocknobytime&timestamp=${unixtime}&closest=before&apikey=${apiKey}`;

    const aaa = await axios.get(url);
    console.log(aaa.data.result);
    setBlockNumber(aaa.data.result);
  };

  const getBalance = async () => {
    clearOutput();
    const web3 = new Web3(new Web3.providers.HttpProvider(`${sourceRpc}`));
    web3.eth.defaultBlock = blockNumber;

    const abi = Erc20Json.abi as any as AbiItem;
    const contractErc20Raw = new web3.eth.Contract(
      abi,
      targetTokenAddress
    ) as unknown as Erc20;
    const contractErc20 = new ContractErc20Wrapper(contractErc20Raw);

    const defaultBlock = await web3.eth.defaultBlock;
    appendOutput(`BlockNumber:\t${String(defaultBlock)}`);
    const chainId = await web3.eth.getChainId();
    appendOutput(`ChainId:\t${String(chainId)}`);

    const balanceNativeWei = await web3.eth.getBalance(targetAddress);
    const balanceNative = web3.utils.fromWei(balanceNativeWei, "ether");
    appendOutput(`Balance Native:\t${String(balanceNative)}`);
    const symbolErc20 = await contractErc20.symbol();
    const decimalsErc20 = await contractErc20.decimals();
    const decimalsErc20PowNumber = 10 ** Number(decimalsErc20);
    const balanceErc20Digits = await contractErc20.balanceOf(targetAddress);
    const balanceErc20DigitsDecimal = new Decimal(balanceErc20Digits);
    const balanceErc20Decimal = balanceErc20DigitsDecimal.div(
      new Decimal(decimalsErc20PowNumber)
    );
    appendOutput(`Balance ${symbolErc20}:\t${String(balanceErc20Decimal)}`);
  };

  return (
    <div>
      <h1>Balance Checker</h1>
      <hr />
      <div>
        <button
          className="btn"
          type="button"
          onClick={enablePolygonDatetimePicker}
        >
          Enable Datetime Picker(Polygon)
        </button>
      </div>
      {isActivePolygon && (
        <div>
          Datetime
          <DatePicker
            selected={sourceDatetime}
            onChange={(date: Date | null) => date && setSourceDatetime(date)}
            showTimeSelect
            inline
          />
          Datetime {sourceDatetime.toString()}
          <button className="btn" type="button" onClick={handleSetBlockNumber}>
            Set BlockNumber
          </button>
        </div>
      )}
      <hr />
      <div>
        RPC
        <input
          className="form-control input-block"
          type="text"
          value={sourceRpc}
          onChange={(e) => setSourceRpc(e.target.value)}
        />
      </div>
      <div>
        API Key
        <input
          className="form-control input-block"
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <div>
        Block
        <input
          type="text"
          value={blockNumber}
          onChange={(e) => setBlockNumber(e.target.value)}
        />
      </div>
      <div>
        Account Address
        <input
          className="form-control input-block"
          type="text"
          value={targetAddress}
          onChange={(e) => setTargetAddress(e.target.value)}
        />
      </div>
      <div>
        Erc20 Token Address
        <input
          className="form-control input-block"
          type="text"
          value={targetTokenAddress}
          onChange={(e) => setTargetTokenAddress(e.target.value)}
        />
      </div>
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

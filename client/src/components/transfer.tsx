import React, { useState } from "react";
import Web3 from "web3";
require("dotenv").config();

//get .env params
const Account = process.env.REACT_APP_ACCOUNT;
const PrivateKey = process.env.REACT_APP_PRIVATE_KEY;
// const RpcHttpUrl = process.env.REACT_APP_RPC_HTTP_URL; //인프라이용
//create web3 connection
const connection = `https://rinkeby.infura.io/v3/039a1d24b7384022a3b6994dd5627c61`;
const web3 = new Web3(new Web3.providers.HttpProvider(connection));

function Main(props) {
  //set params
  const [receiverAddress, setReceiverAddress] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [tokenaddress, setTokenAddress] = useState("");

  //transfer eth from one account to other
  async function transfer() {
    //get nonce
    const nonce = await web3.eth.getTransactionCount(Account, "latest");
    //convert Eth to wei
    const value = web3.utils.toWei(transferAmount.toString(), "Ether");
    const abi = JSON.parse(`[
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]`);
    const tokenContract = new web3.eth.Contract(abi, tokenaddress);
    // input창에 입력한 tokenaddress와 abi를 인자로 넣어 컨트렉트 진행
    //prepare transaction. fields - to, value, gasPrice, gasLimit, nonce

    // 트랜젝션 data만들기!
    const data = tokenContract.methods
      .transfer(receiverAddress, value)
      .encodeABI();
    // transfer함수를 실행하기 위하여 추후에 User주소와, 얼마나 보낼지 value값필요
    const transaction = {
      to: tokenaddress,
      value: "0x00", //인덱스를 16진수로 쓰기위해 00
      gasLimit: 6721975, //changed after EIP-1559 upgrade
      gasPrice: 20000000000, //changed after EIP-1559 upgrade
      nonce: nonce,
      data: data, //트랜잭션 data
    };
    // 트럔잭션설정

    //create signed transaction
    const signTrx = await web3.eth.accounts.signTransaction(
      transaction,
      PrivateKey
    );
    //send signed transaction
    web3.eth.sendSignedTransaction(
      signTrx.rawTransaction,
      function (error, hash) {
        if (error) {
          console.log("Something went wrong", error);
        } else {
          console.log("transaction submitted ", hash);
          window.alert("Transaction submitted. Hash : " + hash);
        }
      }
    );
  }

  return (
    <div>
      <br />
      <div style={{ color: "blue", fontSize: "1.5rem" }}>
        Welcome to DappBlocks!
      </div>
      <div style={{ fontSize: "1.2rem" }}>Token Address :</div>
      <div>
        <input
          type="text"
          style={{ height: "1.5vw", width: "30vw" }}
          onChange={(event) => setTokenAddress(event.target.value)}
          placeholder="0x0000....."
        />
      </div>
      <br />
      <div style={{ fontSize: "1.2rem" }}>Send to :</div>
      <div>
        <input
          type="text"
          style={{ height: "1.5vw", width: "30vw" }}
          onChange={(event) => setReceiverAddress(event.target.value)}
          placeholder="0x0000....."
        />
      </div>
      <br />
      <div style={{ fontSize: "1.2rem" }}>Amount :</div>
      <div>
        <input
          type="text"
          style={{ height: "1.5vw", width: "5vw" }}
          onChange={(event) => setTransferAmount(event.target.value)}
          placeholder="0.0"
        />{" "}
        tokens
      </div>
      <br />
      <div>
        <button type="submit" onClick={() => transfer()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Main;

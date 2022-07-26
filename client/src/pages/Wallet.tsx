import React from "react";
// import Web3 from "web3";
// import { AbiItem } from "web3-utils";
// // abi 타입스크립트 interface 지정

// const connection = `https://rinkeby.infura.io/v3/039a1d24b7384022a3b6994dd5627c61`;
// const web3 = new Web3(new Web3.providers.HttpProvider(connection));

type walProps = {
  account: string;
  balance: string;
  onClickConnect: any;
  tutbalance: string;
};

function Wallet({ account, balance, onClickConnect }: walProps) {
  // const minABI = [
  //   // balanceOf
  //   {
  //     constant: true,
  //     inputs: [{ name: "_owner", type: "address" }],
  //     name: "balanceOf",
  //     outputs: [{ name: "balance", type: "uint256" }],
  //     type: "function",
  //   },
  // ];
  // const tokenAddress = "0x9d8D3C04240cabcF21639656F8b1F2Af0765Cf08";
  // const walletAddress = "0x4bFe6D25A7DACbCF9018a86eDd79A7168eBf6b7f";

  // const contract = new web3.eth.Contract(minABI as AbiItem[], tokenAddress);

  // async function getBalance() {
  //   const result = await contract.methods.balanceOf(walletAddress).call();

  //   const format = web3.utils.fromWei(result);

  //   console.log(format);
  // }

  // getBalance();
  return (
    <div>
      {/* 3항 연산자를 이용 */}
      {/* account 가 있으면 (지갑연결이 되어있으면) disConnect 버튼이 나오고 */}
      {/* account 가 없으면 지갑 연결하라는 버튼이 나온다 */}
      {account ? (
        <div>
          <button>Wallet Connected</button>
          <div>{account}</div>
          <div>{parseInt(balance, 16) / 10 ** 18}</div>
        </div>
      ) : (
        <div>
          <button onClick={onClickConnect}>Connect Wallet</button>
        </div>
      )}
      <div>
        {/* <button onClick={TUTbalance}>TUTbalance</button> */}
        <button>TUTbalance</button>
      </div>
    </div>
  );
}

export default Wallet;

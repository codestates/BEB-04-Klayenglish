import React from "react";
import Web3 from "web3";

type walProps = {
  account: string;
  balance: string;
  onClickConnect: any;
};

function Wallet({ account, balance, onClickConnect }: walProps) {
  //   const getBalance: any = async () => {
  //     let wei, balance;
  //     // console.log("account = " + account);
  //     // console.log("bal = " + window.web3.);
  //     try {
  //       window.ethereum.getBalance(account, function (error: any, wei: any) {
  //         if (!error) {
  //           balance = window.ethereum.fromWei(wei, "ether");
  //           console.log(balance);
  //         }
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     return balance;
  //   };
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
    </div>
  );
}

export default Wallet;

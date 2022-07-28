import React from "react";
// import Web3 from "web3";
import Button from "../components/common/Button";
import styled from "styled-components";
import palette from "../styles/palette";
// import { AbiItem } from "web3-utils";
import { useState } from "react";
// abi 타입스크립트 interface 지정

const Base = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem; // 16px
  margin: 1rem; // 16px
  color: ${palette.gray[200]};
  .wallet_form {
    display: flex;
    flex-direction: column;
    border: 1px solid ${palette.gray[600]};
    gap: 1rem;
    max-height: 30rem;
    max-width: 28rem;
    width: 100%;
    padding: 20px;
    border-radius: 1rem;
    .btn_walletConnect {
      background: linear-gradient(to right top, #da246c, #ff9426);
      color: ${palette.gray[200]};
      :hover {
        background: linear-gradient(to right top, #b81e5c, #d97d21);
      }
    }
    .btn_walletConnected {
      background: linear-gradient(to right top, #48ff11, #ff9426);
      color: ${palette.gray[200]};
      :hover {
        background: linear-gradient(to right top, #1eb870, #d97d21);
      }
    }
    .horizontalLine {
      height: 1px;
      background-color: #737373;
    }
  }
`;
// interface TUTData{
//   SetStateAction :any;
// }

type walProps = {
  account: string;
  balance: string;
  onClickConnect: any;
};

function Wallet({ account, balance, onClickConnect }: walProps) {
  const [TUTbalance, setTUTbalance] = useState();

  const TUTClick = async () => {
    try {
      fetch("http://localhost:3001/wallet", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ account }),
      }).then((res) => {
        if (res.status >= 200 && res.status <= 204) {
          alert("업데이트 완료");
          res
            .json()
            .then((data) => setTUTbalance((data.data.bal / 10 ** 18) as any));
        } else {
          alert("TUT가 없습니다");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Base>
      {account ? (
        <div className="wallet_form">
          <Button className="btn_walletConnected">Wallet Connected</Button>
          <div>
            <div>연결된 지갑주소</div>
            <div className="horizontalLine"></div>
            <div>{account}</div>
            <div className="horizontalLine"></div>
          </div>
        </div>
      ) : (
        <div className="wallet_form">
          <Button className="btn_walletConnect" onClick={onClickConnect}>
            Connect Wallet
          </Button>
        </div>
      )}
      {TUTbalance ? (
        <div className="wallet_form">
          <Button className="btn_walletConnected">Wallet Connected</Button>
          <div>
            <div>
              {" "}
              <h2> Balance : {TUTbalance} TUT</h2>
            </div>
            <div className="horizontalLine"></div>
            <div className="horizontalLine"></div>
          </div>
        </div>
      ) : (
        <div className="wallet_form">
          <Button className="btn_walletConnect" onClick={TUTClick}>
            Check your TUT!
          </Button>
        </div>
      )}
    </Base>
  );
}

export default Wallet;

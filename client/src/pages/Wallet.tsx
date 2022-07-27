import React from "react";
import Web3 from "web3";
import Button from "../components/common/Button";
import styled from "styled-components";
import palette from "../styles/palette";

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

type walProps = {
  account: string;
  balance: string;
  onClickConnect: any;
};

function Wallet({ account, balance, onClickConnect }: walProps) {
  // const [TUTBalance, setTUTBalance] = useState("");

  const TUTClick = async () => {
    try {
      fetch("http://localhost:3001/wallet", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.status >= 200 && res.status <= 204) {
          alert("업데이트 완료");
          // console.log("res", res);
        } else {
          alert("TUT가 없습니다");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
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
    <Base>
      {/* 3항 연산자를 이용 */}
      {/* account 가 있으면 (지갑연결이 되어있으면) disConnect 버튼이 나오고 */}
      {/* account 가 없으면 지갑 연결하라는 버튼이 나온다 */}
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
    </Base>
  );
}
{
  /* <div>
<div>현재 토큰</div>
<div>
  {parseInt(balance, 16) / 10 ** 18}
  <span> tut</span>
</div>
</div> */
}

export default Wallet;

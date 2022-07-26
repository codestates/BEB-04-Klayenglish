import React from "react";
import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Web3 from "web3";
// import { AbiItem } from "web3-utils";
// // abi 타입스크립트 interface 지정

// const connection = `https://rinkeby.infura.io/v3/039a1d24b7384022a3b6994dd5627c61`;
// const web3 = new Web3(new Web3.providers.HttpProvider(connection));

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
    <div>
      {/* 3항 연산자를 이용 */}
      {/* account 가 있으면 (지갑연결이 되어있으면) disConnect 버튼이 나오고 */}
      {/* account 가 없으면 지갑 연결하라는 버튼이 나온다 */}

      <br />
      <br />
      <br />
      <br />
      <div></div>
      <Card className="text-center" border="info">
        <Card.Header>
          <h1>WALLET</h1>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <h2>TUT</h2>
          </Card.Title>
          <Card.Text>
            <h2>잔액</h2>
          </Card.Text>
          {account ? (
            <div>
              <Button variant="primary" size="lg">
                Wallet Connected
              </Button>{" "}
              <div>{account}</div>
              <div>{parseInt(balance, 16) / 10 ** 18} eth</div>
            </div>
          ) : (
            <div>
              <Button onClick={onClickConnect} variant="primary" size="lg">
                Connect Wallet
              </Button>{" "}
            </div>
          )}
          {/* <Button onClick={onClickConnect} variant="primary" size="lg">
            지갑연결
          </Button>{" "} */}
          <br />
          <Button onClick={TUTClick} variant="secondary" size="lg">
            TUT Balance
          </Button>{" "}
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    </div>
  );
}

export default Wallet;

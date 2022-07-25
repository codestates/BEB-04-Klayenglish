// const Web3 = require("web3");
// let connection = new Web3("http://127.0.0.1:7545");

// connection.eth.getAccounts().then((data) => {
//   //프로미스 객체를 반환한다.
//   console.log(data);
// });
// //eth_getBalance
// connection.eth
//   .getBalance("0x8e8dA3C9A515c4e7FE44a2eaA37cB280dEbe03a3")
//   .then((data) => {
//     console.log(data);
//   });

const Web3 = require("web3");
const connection = `https://rinkeby.infura.io/v3/039a1d24b7384022a3b6994dd5627c61`;
//  Private 블록체인으로 연결하고 싶다면 localhost:8545로 객체를 연동하면 됩니다.
const toAddress = "0x7208cd7b30Ab7Ff7F897454Aa780dF5178a58F49";
// 내 account1
const privateKey =
  "0402db5843b4fbf3f79508185f43c6efeacd178aa31d52e35bc53dfb3becbaf9";
// 내 account2  2에서 1으로 트랜잭션발생시킬거
// 트랜잭션 해시가 만들어지는 원리는 트랜잭션 정보와 프라이빗 키(서명)가 필요 !
// 트랜잭션 정보와 서명을 전달하면 노드로 부터 트랜잭션 해시를 받을 수 있다
// 트랜잭션 정보와 서명(encoding)을 합친 것읅 rawTransaction이라고 부른다.
const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

try {
  const web3 = new Web3(new Web3.providers.HttpProvider(connection));
  console.log("web3연결 성공!");
  console.log("갯수: ");
  const tokenContract = new web3.eth.Contract(
    abi,
    "0x9d8d3c04240cabcf21639656f8b1f2af0765cf08"
  );
  const data = tokenContract.methods
    .transfer("0x7208cd7b30ab7ff7f897454aa780df5178a58f49", "10")
    .encodeABI();

  const txHash = web3.eth.accounts
    .signTransaction(
      {
        to: toAddress,
        value: "1000000000",
        gas: 21000,
        // data를넣어줘야함
        data: data,
      },
      privateKey
    )
    // .on("transactionHash", (transactionHash) => {
    //   console.log("txHash", transactionHash);
    // })
    // .on("receipt", (receipt) => {
    //   console.log("receipt", receipt);
    //   // txResult = true;
    // })
    // .on("error", (error) => {
    //   console.log("error", error);
    // })
    // .getBalance("0x4bFe6D25A7DACbCF9018a86eDd79A7168eBf6b7f")
    //  프라이빗키인지 주소인지 모르겠음
    // web3.eth.accounts.signTransacion 코드는 트랜잭션 정보와 개인키를 이용해 rawTransaction을 만들어주는 함수

    .then(console.log);

  // tracsactionHash가 생성이 되지만 트랜잭션 해시는 전송되기전에 미리알수있는값 => 아직안보내짐
} catch (e) {
  console.log("Connection Error!", e);
}

// // web3.eth.accounts.signTransaction(tx, privKey) => ome parameters such as: addressFrom, addressTo, number of tokens to send, and the gas limit.
// let txHash = web3.eth.sendTransaction({
//   from: account,
//   to: toAddress,
//   value: sendAmount,
// });

// console.log(txHash);

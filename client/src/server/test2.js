// Error: Returned error: insufficient funds for gas * price + value
// Permit 함수 컨트렉트 배포??????????
// https://rinkeby.etherscan.io/token/0x9d8d3c04240cabcf21639656f8b1f2af0765cf08?a=0xaaa1d852b67fbbbd387b9e088661eccc55d9e5d2
// 컨트렉트 수정 후 => 컨트렉트 주소바꾸기
const Web3 = require("web3");
const connect = `https://rinkeby.infura.io/v3/039a1d24b7384022a3b6994dd5627c61`;
const web3 = new Web3(new Web3.providers.HttpProvider(connect));
const privateKey =
  "0xfd1457b1c8471d62ea0379400e218653b790dbc92e7f48feedc569c128e196e2"; //Your Private key environment variable
let tokenAddress = "0x9d8D3C04240cabcF21639656F8b1F2Af0765Cf08"; // TUT Token contract address
// let toAddress = "0x7208cd7b30Ab7Ff7F897454Aa780dF5178a58F49"; // where to send it
let fromAddress = "0xaaa1d852b67fbbbd387b9e088661eccc55d9e5d2"; // your wallet
let toAddress = "0x4bFe6D25A7DACbCF9018a86eDd79A7168eBf6b7f";
// 0x9f214a2aeff2d45bce016f727f9531738a6e5833
//0402db5843b4fbf3f79508185f43c6efeacd178aa31d52e35bc53dfb3becbaf9 서버지갑 프라이빗키
let contractABI = [
  // transfer
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",
  },
];

// let lec_fromAddress = rows[0].address; ////user지갑주소
// let lec_privateKey = rows[0].privateKey; //user 프라이빗키 (보낼때 서명으로 쓰임)
// let lec_toAddress = "0x4bFe6D25A7DACbCF9018a86eDd79A7168eBf6b7f"; // 받을계좌=>서버

// 체크
let contract = new web3.eth.Contract(contractABI, tokenAddress, {
  from: fromAddress,
});
let amount = web3.utils.toHex(web3.utils.toWei("10")); //lec_price로 TUT 갯수 설정
let data = contract.methods.transfer(toAddress, amount).encodeABI();
sendErcToken();
function sendErcToken() {
  let txObj = {
    gas: web3.utils.toHex(100000),
    to: tokenAddress,
    value: "0x00",
    data: data,
    from: fromAddress,
  };
  web3.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
    if (err) {
      return console("signTransaction ERROR!", err);
    } else {
      console.log(signedTx);
      return web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            // web3.eth.getBalance(toAddress);
            console.log(res);
          }
        }
      );
    }
  });
}

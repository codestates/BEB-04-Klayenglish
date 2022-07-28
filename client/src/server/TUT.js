// const Web3 = require("web3");
// const Web3js = new Web3(
//   new Web3.providers.HttpProvider(
//     "https://{username}:{password}@bisontrailsURL"
//   )
// );
const Web3 = require("web3");
const connect = `https://rinkeby.infura.io/v3/039a1d24b7384022a3b6994dd5627c61`;
const web3 = new Web3(new Web3.providers.HttpProvider(connect));
const privateKey =
  "0402db5843b4fbf3f79508185f43c6efeacd178aa31d52e35bc53dfb3becbaf9"; //보낼계좌 프라이빗키 => 서버 프라이빗키써둠
let tokenAddress = "0x9d8D3C04240cabcF21639656F8b1F2Af0765Cf08"; // 토큰 스마트컨트렉트 주소
let toAddress = "0x7208cd7b30Ab7Ff7F897454Aa780dF5178a58F49"; // 받을계좌
let fromAddress = "0x4bFe6D25A7DACbCF9018a86eDd79A7168eBf6b7f"; // 보낼계좌 => 이주소는 현재 서버주소써둠
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
let contract = new web3.eth.Contract(contractABI, tokenAddress, {
  from: fromAddress,
});
let amount = web3.utils.toHex(web3.utils.toWei("1")); //1 TUT Token
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
            console.log(res);
          }
        }
      );
    }
  });
}

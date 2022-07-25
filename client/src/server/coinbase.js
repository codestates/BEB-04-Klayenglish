// const Web3 = require("web3");
// const Web3js = new Web3(
//   new Web3.providers.HttpProvider(
//     "https://{username}:{password}@bisontrailsURL"
//   )
// );
const Web3 = require("web3");
const connection = `https://rinkeby.infura.io/v3/039a1d24b7384022a3b6994dd5627c61`;
const Web3js = new Web3(new Web3.providers.HttpProvider(connection));
const privateKey =
  "0402db5843b4fbf3f79508185f43c6efeacd178aa31d52e35bc53dfb3becbaf9"; //Your Private key environment variable
let tokenAddress = "0x9d8D3C04240cabcF21639656F8b1F2Af0765Cf08"; // Demo Token contract address
let toAddress = "0x7208cd7b30Ab7Ff7F897454Aa780dF5178a58F49"; // where to send it
let fromAddress = "0x4bFe6D25A7DACbCF9018a86eDd79A7168eBf6b7f"; // your wallet
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
let contract = new Web3js.eth.Contract(contractABI, tokenAddress, {
  from: fromAddress,
});
let amount = Web3js.utils.toHex(Web3js.utils.toWei("1")); //1 DEMO Token
let data = contract.methods.transfer(toAddress, amount).encodeABI();
sendErcToken();
function sendErcToken() {
  let txObj = {
    gas: Web3js.utils.toHex(100000),
    to: tokenAddress,
    value: "0x00",
    data: data,
    from: fromAddress,
  };
  Web3js.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
    if (err) {
      return console("signTransaction ERROR!", err);
    } else {
      console.log(signedTx);
      return Web3js.eth.sendSignedTransaction(
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

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

try {
  const web3 = new Web3(new Web3.providers.HttpProvider(connection));
  console.log("web3연결 성공!");
  console.log("갯수: ");
  web3.eth
    .getBalance("0x4bFe6D25A7DACbCF9018a86eDd79A7168eBf6b7f")
    .then(console.log);
} catch (e) {
  console.log("Connection Error!", e);
}

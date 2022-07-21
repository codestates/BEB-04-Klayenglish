const express = require("express");
const app = express();
const port = 8080;
const Web3 = require("web3");
const TUTabi = require("./contracts/TUTabi");

function getWeb3() {
  const web3 = new Web3(
    new Web3.providers.HttpProvider("http://127.0.0.1:7545")
  );
  return web3;
}

async function getAccounts() {
  try {
    const accounts = await getWeb3().eth.getAccounts();
    console.log(accounts);
    return accounts;
  } catch (e) {
    console.log(e);
    return e;
  }
}

app.get("/", (req, res) => {
  getAccounts().then((accounts) => {
    res.send(accounts);
  });
});
app.listen(port, () => {
  console.log("Listening...");
});

// const Web3 = require("web3");
// let connection = new Web3("http://127.0.0.1:7545");

// connection.eth.getAccounts().then((data) => {
//   //프로미스 객체를 반환한다.
//   console.log(data);
// });
// //eth_getBalance
// connection.eth
//   .getBalance("0x8e8dA3C9A515c4e7FE44a2eaA37cB280dEbe03a3")
//   // 가나슈 첫번째 주소 확인용
//   .then((data) => {
//     console.log(data);
//   });

// require("dotenv").config(); //사용법모름
// const Web3 = require("web3");
// const web3 = new Web3(
//   `https://rinkeby.infura.io/v3/83a224a2962f4a409e1378e5a4122335`
// );
// console.log(web3);

// web3.eth.getAccounts().then((data) => {
//   //프로미스 객체를 반환한다.
//   console.log(data);
// });
// //eth_getBalance
// web3.eth
//   .getBalance("0x8e8dA3C9A515c4e7FE44a2eaA37cB280dEbe03a3")
//   // 가나슈 첫번째 주소 확인용
//   .then((data) => {
//     console.log(data);
//   });

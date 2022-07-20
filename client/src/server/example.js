const Web3 = require("web3");
let connection = new Web3("http://127.0.0.1:7545");

connection.eth.getAccounts().then((data) => {
  //프로미스 객체를 반환한다.
  console.log(data);
});
//eth_getBalance
connection.eth
  .getBalance("0x8e8dA3C9A515c4e7FE44a2eaA37cB280dEbe03a3")
  .then((data) => {
    console.log(data);
  });

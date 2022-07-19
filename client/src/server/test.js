// // test.js;
// const express = require("express");
// const app = express();
// const port = 8080;
// const Caver = require("caver-js");
// const caver = new Caver("https://api.baobab.klaytn.net:8651/");
// // EN을 실행 중인 경우, 아래와 같이 호스트와 포트를 변경하여 자신의 노드에 연결가능

// app.get("/", (req, res) => {
//   res.send("Hello Node.js!");
// });
// app.listen(port, () => {
//   console.log("Listening...");
// });

// async function testFunction() {
//   // Add a keyring to caver.wallet
//   const keyring = caver.wallet.keyring.createFromPrivateKey("0x{private key}");
//   caver.wallet.add(keyring);

//   // Create a value transfer transaction
//   const valueTransfer = caver.transaction.valueTransfer.create({
//     from: keyring.address,
//     to: "0x176ff0344de49c04be577a3512b6991507647f72",
//     value: 1,
//     gas: 30000,
//   });

//   // Sign the transaction via caver.wallet.sign
//   await caver.wallet.sign(keyring.address, valueTransfer);

//   const rlpEncoded = valueTransfer.getRLPEncoding();
//   console.log(`RLP-encoded string: ${rlpEncoded}`);
// }

// testFunction();

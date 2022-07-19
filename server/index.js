const express = require("express");
const app = express();
const port = 8080;
const Contract = require("web3-eth-contract");

async function deploySimpleToken() {
  try {
    const abi = [
      {
        inputs: [
          {
            internalType: "string",
            name: "getName",
            type: "string",
          },
          {
            internalType: "string",
            name: "getSymbol",
            type: "string",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      // 생략
    ];

    const byteCode = "0000"; // 바이트코드를 붙여넣습니다
    Contract.setProvider("http://127.0.0.1:7545");
    const contract = new Contract(abi);
    const receipt = await contract
      .deploy({ data: "0x" + byteCode, arguments: ["ErcSimpleToken", "EST"] })
      .send({
        from: "0xb52A55FEB29a3D3731215A0fFFbdA65d7cF34648",
        gas: 2000000,
        gasPrice: "1000000000000",
      });
    console.log(receipt);
    return receipt;
  } catch (e) {
    console.log(e);
    return e;
  }
}

app.get("/deploy", (req, res) => {
  deploySimpleToken().then((result) => {
    res.send(result);
  });
});

app.listen(port, () => {
  console.log("Listening...");
});

// const express = require("express");
// const app = express();
// const port = 8080;
// const Web3 = require("web3");

// function getWeb3() {
//   const web3 = new Web3(
//     new Web3.providers.HttpProvider("http://127.0.0.1:7545")
//   );
//   return web3;
// }

// async function getAccounts() {
//   try {
//     const accounts = await getWeb3().eth.getAccounts();
//     console.log(accounts);
//     return accounts;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// }

// app.get("/", (req, res) => {
//   getAccounts().then((accounts) => {
//     res.send(accounts);
//   });
// });
// app.listen(port, () => {
//   console.log("Listening...");
// });

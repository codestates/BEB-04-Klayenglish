require("dotenv").config();
const express = require("express");
const router = express.Router();
const Web3 = require("web3");
const { User } = require("../models");

const web3 = new Web3("http://localhost:7545");
const tokenabi = require("../contract/tokenAbi");
const bytecode = require("../contract/bytecode");

router.post("/", async (req, res) => {
  const serverAccount = await User.findOne({
    attributes: ["privatekey"],
    where: {
      username: "server",
    },
  });
  console.log("찾기 성공");
  //console.log(serverAccount)
  const server = await web3.eth.accounts.wallet.add(
    serverAccount.dataValues.privatekey
  );
  //console.log(server)
  const parameter = {
    from: server.address,
    gas: 3000000,
  };
  //console.log("바이트 코드", bytecode)
  const tokenContract = new web3.eth.Contract(tokenabi);
  //console.log('성공')
  tokenContract
    .deploy({
      data: bytecode,
    })

    .send({
      from: server.address,
      gas: 3000000,
    })
    .on("receipt", async (receipt) => {
      res.status(201).json({
        message: "deploying ERC20 is succeed",
        receipt,
      });
      //console.log(receipt.events.Transfer.returnValues.value)
      //생성된 토큰양
    })
    .on("error", (error) => {
      console.log(error);
      res.status(400).json({ message: "deploying ERC20 is failed" });
    });
});

module.exports = router;

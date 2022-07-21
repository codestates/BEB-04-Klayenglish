const express = require("express");
const router = express.Router();
// const lightwallet = require("eth-lightwallet");
const { User } = require("../models");
const Web3 = require("web3");

const web3 = new Web3("http://localhost:7545");
const tokenabi = require("../contract/tokenAbi");

router.get("/", async (req, res) => {
  // 포스트맨에서 userName, password를 넣으면
  let reqEmail, reqPassword;
  reqEmail = req.body.email;
  reqPassword = req.body.password;

  // user에서 find로 userName을 찾고,
  const userInfo = await User.findOne({
    where: {
      email: reqEmail,
      password: reqPassword,
    },
  });
  // console.log(userInfo)
  if (!userInfo) {
    res.status(400).send({ data: null, message: "not authorized" });
  } else {
    const payload = {
      userName: userInfo.dataValues.userName,
      email: userInfo.dataValues.email,
      createdAt: userInfo.dataValues.createdAt,
      updatedAt: userInfo.dataValues.updatedAt,
    };

    const value = "10";
    const erc20Contract = await new web3.eth.Contract(
      tokenabi,
      process.env.ERC20_CONTRACT,
      {
        from: process.env.SERVER_ADDRESS,
      }
    );

    const server = await web3.eth.accounts.wallet.add(
      process.env.SERVER_SECRET
    );

    await erc20Contract.methods.mintToken(userInfo.address, value).send({
      from: server.address,
      to: process.env.ERC20_CONTRACT,
      gasPrice: 100,
      gas: 2000000,
    });

    await User.increment(
      { balance: 1 },
      {
        where: {
          email: req.body.email,
        },
      }
    );
    res.status(201).send({ data: payload, message: "Login Successed" });
  }
});

module.exports = router;

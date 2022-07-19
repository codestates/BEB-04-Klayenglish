require("dotenv").config();
const express = require("express");
const router = express.Router();
const Web3 = require("web3");
const { User } = require("../models");

const web3 = new Web3(
  `https://ropsten.infura.io/v3/${process.env.INFURA_ADDRESS}`
);
const erc20abi = require("../contracts/erc20abi");
const erc20bytecode = require("../contracts/erc20bytecode");

router.post("/deploytoken", async (req, res) => {
  const serverAccount = await User.findOne({
    attributes: ["privatekey"],
    where: {
      username: "server",
    },
  });

  const server = await web3.eth.accounts.wallet.add(serverAccount.privatekey);

  const parameter = {
    from: server.address,
    gas: 3000000,
  };

  const tokenContract = new web3.eth.Contract(erc20abi);

  tokenContract
    .deploy({
      data: erc20bytecode,
    })
    .send(parameter)
    .on("receipt", async (receipt) => {
      res.status(201).json({
        message: "deploying ERC20 is succeed",
        receipt,
      });
    })
    .on("error", (error) => {
      console.log(error);
      res.status(400).json({ message: "deploying ERC20 is failed" });
    });
});

// router.post("/transfertoken", async (req, res) => {
//   const value = "1000000000000000000";
//   const myErc20Contract = await new web3.eth.Contract(
//     erc20abi,
//     process.env.ERC20_CONTRACT,
//     {
//       from: process.env.SERVER_ADDRESS,
//     }
//   );

//   const server = await web3.eth.accounts.wallet.add(process.env.SERVER_SECRET);

//   await myErc20Contract.methods
//     .transfer("0x3d8761340aeeca56eda57546f791fe45945a5eae", value)
//     .send({
//       from: server.address,
//       to: process.env.ERC20_CONTRACT,
//       gasPrice: 100,
//       gas: 2000000,
//     })
//     .on("receipt", (receipt) => {
//       const msg = "Succeed in minting new ERC20 Token.";
//       res.status(201).json({ receipt, msg });
//     })
//     .on("error", (error) => {
//       error = error.toString();
//       const msg = "Failed to mint new ERC20 Token.";
//       res.status(500).send({ error, msg });
//     });
// });

module.exports = router;

const Web3 = require("web3");
const web3 = new Web3("http://localhost:7545");
const { Users } = require("../../models");
// const { erc20abi } = require("../../erc-20/abi");

module.exports = {
  //특정 행동시 토큰 보상 핸들러
  transfer: async (recipient) => {
    const contractAddress = "0x392975c1C62abBd2854ACc440E2313CcB9b14D0A";
    //DB에서 admin 계정 address,privateKey 조회
    const sender = await Users.findOne({
      attributes: ["address", "privateKey"],
      where: { user_id: "admin" },
    });

    const tokenContract = await new web3.eth.Contract(abi, contractAddress);

    const transfer = {
      from: sender.dataValues.address,
      to: contractAddress,
      gas: 2000000,
      data: tokenContract.methods
        .transfer(recipient, "1000000000000000000")
        .encodeABI(),
      W,
    };

    const createTransaction = await web3.eth.accounts.signTransaction(
      transfer,
      sender.dataValues.privateKey
    );

    //서명한 트랜잭션 보내기
    const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
    );

    return createReceipt;
  },
};

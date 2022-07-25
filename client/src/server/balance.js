// balance 조희 테스트
const Web3 = require("web3");
const connection = `https://rinkeby.infura.io/v3/039a1d24b7384022a3b6994dd5627c61`;
const web3 = new Web3(new Web3.providers.HttpProvider(connection));

// The minimum ABI required to get the ERC20 Token balance
const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];
const tokenAddress = "0x9d8D3C04240cabcF21639656F8b1F2Af0765Cf08";
const walletAddress = "0x4bFe6D25A7DACbCF9018a86eDd79A7168eBf6b7f"; //UserAddress 불러오기

const contract = new web3.eth.Contract(minABI, tokenAddress);

async function getBalance() {
  const result = await contract.methods.balanceOf(walletAddress).call();

  const format = web3.utils.fromWei(result);
  console.log(format);
}

getBalance();

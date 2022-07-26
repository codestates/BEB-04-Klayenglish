app.post("/wallet", (req, res) => {
  connection.query("SELECT * FROM users", function (err, rows, fields) {
    if (err) {
      console.log("실패");
    } else {
      if (rows.length < 1) {
        console.log("조회된결과가 하나도 없습니다.");
      } else {
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
        res.send(rows);
      }
    }
  });
});

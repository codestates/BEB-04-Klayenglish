// User 지갑주소, 유저프라이빗키, lec_price 설정

connection.query(
  "SELECT address, privatekey FROM users ORDER BY id DESC LIMIT 1",

  function (err, rows, fields) {
    if (err) {
      console.error(err);
    } else {
      if (rows.length < 1) {
        let lec_fromAddress = rows[0].address; ////user지갑주소
        let lec_privateKey = rows[0].privateKey; //user 프라이빗키 (보낼때 서명으로 쓰임)
        let lec_toAddress = "0x4bFe6D25A7DACbCF9018a86eDd79A7168eBf6b7f"; // 받을계좌=>서버

        // 체크
        let contract = new web3.eth.Contract(contractABI, tokenAddress, {
          from: lec_fromAddress,
        });
        let amount = web3.utils.toHex(web3.utils.toWei(lec_price)); //lec_price로 TUT 갯수 설정
        let data = contract.methods.transfer(lec_toAddress, amount).encodeABI();
        sendErcToken();
        function sendErcToken() {
          let txObj = {
            gas: web3.utils.toHex(100000),
            to: tokenAddress,
            value: "0x00",
            data: data,
            from: lec_fromAddress,
          };
          web3.eth.accounts.signTransaction(
            txObj,
            lec_privateKey,
            (err, signedTx) => {
              if (err) {
                return console("signTransaction ERROR!", err);
              } else {
                console.log(signedTx);
                return web3.eth.sendSignedTransaction(
                  signedTx.rawTransaction,
                  (err, res) => {
                    if (err) {
                      console.log(err);
                    } else {
                      // web3.eth.getBalance(toAddress);
                      console.log(res);
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  }
);

const express = require("express");
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용
const dotenv = require("dotenv");
const jwt = require("./jwt-util");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "../../.env" });
// control + c -> 서버 종료 커맨드
// .env 마지막줄에  SECRET_KEY=mySuperSecretKey (JWT관련)추가해주세요~ -규현

// const lightwallet = require("eth-lightwallet");
const Web3 = require("web3");
const connect = `https://rinkeby.infura.io/v3/039a1d24b7384022a3b6994dd5627c61`;
const web3 = new Web3(new Web3.providers.HttpProvider(connect));
const privateKey =
  "0402db5843b4fbf3f79508185f43c6efeacd178aa31d52e35bc53dfb3becbaf9"; //Your Private key environment variable
let tokenAddress = "0x9d8D3C04240cabcF21639656F8b1F2Af0765Cf08"; // TUT Token contract address
// let toAddress = "0x7208cd7b30Ab7Ff7F897454Aa780dF5178a58F49"; // where to send it
let fromAddress = "0x4bFe6D25A7DACbCF9018a86eDd79A7168eBf6b7f"; // your wallet
let contractABI = [
  // transfer
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",
  },
];

var connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME, //mysql의 id
  password: process.env.DATABASE_PASSWORD, //mysql의 password
  database: process.env.DATABASE_NAME, //사용할 데이터베이스
});

connection.connect();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(cookieParser());

app.post("/user/auth", (req, res) => {
  // 인증
  const token = req.headers.authorization.split("Bearer ")[1];
  const result = jwt.verify(token);
  if (result.ok) {
    // token이 검증되었으면 req에 값을 세팅하고, 다음 콜백함수로 갑니다.
    const { id, pwd, nickname } = result;
    res.status(200).send({
      ok: true,
      data: {
        email: id,
        nickname,
      },
    });
  } else {
    // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
    res.status(401).send({
      ok: false,
      message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
    });
  }
});

app.post("/user/login", (req, res) => {
  //로그인
  const id = req.body.id;
  const pwd = req.body.pwd;
  const loginInfo = [id, pwd];
  connection.query(
    "SELECT * FROM users where userName=? and password=?",
    loginInfo,
    function (err, rows, fields) {
      //   console.log("rows = " + rows.length);
      if (rows.length < 1) {
        res.status(400).send({ message: "입력정보가 맞지 않습니다." });
      } else {
        const accessToken = jwt.sign(rows[0]);
        const refreshToken = jwt.refresh();
        console.log("로그인됨");
        res.status(200).send({
          // client에게 토큰 반환합니다.
          ok: true,
          data: {
            accessToken,
          },
        });
      }
    }
  );
});

app.post("/user/register", (req, res) => {
  // console.log(req.body.regForm.username);
  const id = req.body.regForm.username;
  // json형식의 object에서 각 value만 담아서 배열을 만든다 아래insert ?구문에 들어갈 [ary]배열을 만들기 위함
  const valExtract = req.body.regForm;
  const ary = [];

  for (key in valExtract) {
    ary.push(valExtract[key]);
  }

  connection.query(
    "SELECT * FROM users where userName=?",
    id,
    function (err, rows, fields) {
      if (err) {
        console.error(err);
      } else {
        if (rows.length < 1) {
          //email을 조회에서 결과가 없다면 insert
          //   address,privateKey 추후에 지갑주소와 니모닉도 넣을때 다음 column들 추가

          let wallet = web3.eth.accounts.create();
          ary.push(wallet.address);
          ary.push(wallet.privateKey);
          console.log("address = " + wallet.address);
          console.log("privateKey = " + wallet.privateKey);
          console.log(ary);
          let toAddress = wallet.address;
          let contract = new web3.eth.Contract(contractABI, tokenAddress, {
            from: fromAddress,
          });
          let amount = web3.utils.toHex(web3.utils.toWei("1")); //1 TUT Token
          let data = contract.methods.transfer(toAddress, amount).encodeABI();
          sendErcToken();
          function sendErcToken() {
            let txObj = {
              gas: web3.utils.toHex(100000),
              to: tokenAddress,
              value: "0x00",
              data: data,
              from: fromAddress,
            };
            web3.eth.accounts.signTransaction(
              txObj,
              privateKey,
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
                        console.log(res);
                      }
                    }
                  );
                }
              }
            );
            // .getBalance(toAddress)
          }

          // console.log(wallet);
          connection.query(
            "INSERT INTO users(userName,password,nickName,address,privateKey) values (?)",
            [ary],
            function (err, rows, fields) {
              if (err) {
                console.log(err);
              } else {
                console.log("insert 성공");
                res.status(200).send();
                // 컨트렉트 넣음
              }
            }
          );
        } else {
          //email을 조회해서 결과가 있다면 이미 등록된 아이디
          //   console.log("이미가입된 사용자입니다.");
          res.status(400).send();
        }
      }
    }
  );
});

app.post("/selectCard", (req, res) => {
  connection.query("SELECT * FROM lecture", function (err, rows, fields) {
    if (err) {
      console.log("실패");
    } else {
      if (rows.length < 1) {
        console.log("조회된결과가 하나도 없습니다.");
      } else {
        console.log(rows);
        res.send(rows);
      }
    }
  });
});

app.listen(port, () => {
  console.log(`✅ Connect at http://localhost:${port} 🚀`);
});

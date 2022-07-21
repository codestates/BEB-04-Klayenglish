const express = require("express");
// const router = express.Router();
const app = express();

// const { User } = require("../models");
// require("dotenv").config();
// const env = process.env;

const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "../../.env" });

const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:7545");
const TUTabi = require("./contracts/TUTabi");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

var connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME, //mysql의 id
  password: process.env.DATABASE_PASSWORD, //mysql의 password
  database: process.env.DATABASE_NAME, //사용할 데이터베이스
});

connection.connect();

// app.post("/user/login", (req, res) => {
//   //로그인
//   const id = req.body.id;
//   const pwd = req.body.pwd;
//   const loginInfo = [id, pwd];

//   connection.query(
//     "SELECT * FROM users where userName=? and password=?",
//     loginInfo,
//     function (err, rows, fields) {
//       //   console.log("rows = " + rows.length);
//       if (rows.length < 1) {
//         res.status(400).send({ message: "입력정보가 맞지 않습니다." });
//       } else {
//         console.log("로그인됨");
//         console.log(rows[0].nickName);
//         res.status(200).send({ message: "login success" });
//       }
//     }
//   );
// });

app.post("/", (req, res) => {
  const id = req.body.id;
  const pwd = req.body.pwd;
  const loginInfo = [id, pwd]; //서버만 받도록

  connection.query(
    "SELECT * FROM users where userName=? and password=?",
    loginInfo,
    function (err, rows, fields) {
      //   console.log("rows = " + rows.length);
      if (rows.length < 1) {
        res.status(400).send({ message: "입력정보가 맞지 않습니다." });
      } else {
        console.log("로그인됨");
        console.log(rows[0].nickName);
        // const server = web3.eth.accounts.privateKeyToAccount(

        // );

        res.status(200).send({ message: "login success" });
      }
    }
  );
});

  if (reqUserName === "server") {
    User.findOne({
      where: {
        userName: reqUserName,
        password: reqPassword,
      },
    }).then((result) => {
      if (result == null) {
        res.status(502).send({ message: "Error Transaction Failed" });
      } else {
        //console.log("private key가",result.dataValues)
        const server = web3.eth.accounts.privateKeyToAccount(
          result.dataValues.privateKey
        ); //검색한 사용자의 프라이빗키

        const ganache = web3.eth.accounts.privateKeyToAccount(
          env.GANACHE_PRIVATEKEY
        ); //가나슈의 프라이빗키
        //console.log(ganache)
        web3.eth.accounts
          .signTransaction(
            //서명 후 전송처리
            {
              to: server.address,
              value: "1000000000000000000",
              gas: 2000000,
            },
            ganache.privateKey
          )

          .then((value) => {
            console.log("value값", value);
            return value.rawTransaction;
          })

          .then(async (tx) => {
            web3.eth.sendSignedTransaction(tx, async function (err, hash) {
              if (!err) {
                const addressBalance = await web3.eth.getBalance(
                  result.dataValues.address
                );
                //console.log("이게 머지",value.rawTransaction)
                res.status(200).send({
                  message: "Faucet Successed",
                  data: {
                    username: reqUserName,
                    address: result.dataValues.address,
                    balance: addressBalance,
                    txHash: hash,
                  },
                });
              } else {
                console.log("transfer failed!");
              }
            });
          });
      }
    });
  } else {
    res.status(501).send({ message: "You are not server" });
  }
};
app.listen(port, () => {
  console.log(`✅ Connect at http://localhost:${port} 🚀`);
});

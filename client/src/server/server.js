const express = require("express");
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "../../.env" });
// control + c -> 서버 종료 커맨드

// const lightwallet = require("eth-lightwallet");
const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:7545");
const TUTabi = require("./contracts/TUTabi");

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
app.use(cookieParser());

app.post("/", (req, res) => {
  // TODO : server라는 admin 계정 생성시에 ethFacet 처리
  const id = req.body.userName;
  const pwd = req.body.password;

  if (id === "server") {
    const server = web3.eth.accounts.privateKeyToAccount(
      rows.dataValues.privateKey
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
      });

    web3.eth.sendSignedTransaction(tx, async function (err, hash) {});
  } else {
    res.status(501).send({ message: "server 계정생성 필요" });
  }
});

app.post("/user/login", (req, res) => {
  //TODO : 로그인 => erc20Contract.methods.mintToken 발급 / 데이터 balance로 코인보유량 추가
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
        //     const payload = {
        //       userName: userInfo.dataValues.userName,
        //       email: userInfo.dataValues.email,
        //       createdAt: userInfo.dataValues.createdAt,
        //       updatedAt: userInfo.dataValues.updatedAt,
        //     }

        //    const value = "10";
        // const erc20Contract = await new web3.eth.Contract(
        //   tokenabi,
        //   process.env.ERC20_CONTRACT,
        //   {
        //     from: process.env.SERVER_ADDRESS,
        //   }
        // );

        // const server = await web3.eth.accounts.wallet.add(process.env.SERVER_SECRET);

        // await erc20Contract.methods.mintToken(userInfo.address, value).send({
        //   from: server.address,
        //   to: process.env.ERC20_CONTRACT,
        //   gasPrice: 100,
        //   gas: 2000000,
        // })

        // await User.increment(
        //   { balance: 1 },
        //   {
        //     where: {
        //       email: req.body.email,
        //     },
        //   }
        // );

        console.log("로그인됨");
        console.log(rows[0].nickName);
        res.status(200).send({ message: "login success" });
      }
    }
  );
});

app.post("/user/register", (req, res) => {
  console.log(req.body.regForm.username);
  console.log(req.body.regForm.password);
  console.log(req.body.regForm.nickname);

  const id = req.body.regForm.username;
  //   console.log(req.body.signForm);
  // json형식의 object에서 각 value만 담아서 배열을 만든다 아래insert ?구문에 들어갈 [ary]배열을 만들기 위함
  const valExtract = req.body.regForm;
  const ary = [];
  // key 애러 발생
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
          connection.query(
            "INSERT INTO users([userName,password,nickName]) values (?)",
            [ary],
            function (err, rows, fields) {
              if (err) {
                console.log(err);
              } else {
                let wallet = web3.eth.accounts.create();
                console.log(wallet);
                // connection.query(
                //   "INSERT INTO users(address,privateKey) values (wallet.address,wallet.privateKey)",
                //   function (err, rows, fields) {
                //     if (err) {
                //       console.error(err);
                //     } else {
                //       console.log("insert 성공");
                //     }
                //   }
                // );
                // console.log(wallet);
                console.log("insert 성공");

                res.status(200).send();
              }
            }
          );
          // TODO : 계정에 wallet.address와 wallet.privateKey 데이터에 넣어주기
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

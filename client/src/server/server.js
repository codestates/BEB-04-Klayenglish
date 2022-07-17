const express = require("express");
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
// command + c -> 서버 종료 커맨드

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

app.post("/login", (req, res) => {
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
        console.log("로그인됨");
        res.status(200).send({ message: "login success" });
      }
    }
  );
});

app.post("/register", (req, res) => {
  console.log(req.body.regForm.username);
  console.log(req.body.regForm.password);
  console.log(req.body.regForm.nickname);

  const id = req.body.regForm.username;
  //   console.log(req.body.signForm);
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
          connection.query(
            "INSERT INTO users(userName,password,nickName) values (?)",
            [ary],
            function (err, rows, fields) {
              if (err) {
                console.log(err);
              } else {
                console.log("insert 성공");
                res.status(200).send();
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

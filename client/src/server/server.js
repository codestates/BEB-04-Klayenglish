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

app.post("/wallet", (req, res) => {
  let currentAccount = req.body.account;
  console.log(currentAccount); //연결된 주소로 바꾸기
  connection.query(
    "SELECT address FROM users ORDER BY id DESC LIMIT 1;",
    function (err, rows, fields) {
      if (rows.length > 0) {
        // const addressuser = rows[0].address;
        const addressuser = "0x19eae62c6ab1906aa08253107178a8a502a97c43";
        console.log("로그인됨", addressuser);

        // 답은 비동기식 처리방법에 있다 post 요청을 받고 안에서 분명히 getRedisData를 호출하여 리턴 값을 요청했지만
        // 비동기식 처리로 인해 getRedisData의 리턴을 기다리지 않고 res.send요청을 실행해서 이런 결과가 발생한 것이다
        // 외부함수로 부터 리턴을 받기 위해서는 Promise형식으로 작성해야한다⚠

        const tokenAddress = "0x9d8D3C04240cabcF21639656F8b1F2Af0765Cf08";
        const walletAddress = addressuser; //UserAddress 불러오기
        const contract = new web3.eth.Contract(minABI, tokenAddress);

        async function getBalance(walletAddress) {
          const result = await contract.methods.balanceOf(walletAddress).call();
          return result;
        }
        const getBal = Promise.resolve(getBalance(walletAddress));
        getBal.then((bal) => {
          return res.status(200).send({
            ok: true,
            data: {
              bal,
              addressuser,
            },
          });
        });
      } else {
        res.status(400).send({
          ok: false,
          message: "해당 유저가 존재하지 않거나, 유효하지 않은 양식입니다.",
        });
        console.log("로그인 fail");
      }
    }
  );
});

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

// 유효성 검사(기능 구현) -규현
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
      if (rows.length > 0) {
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
      } else {
        res.status(400).send({
          ok: false,
          message: "해당 유저가 존재하지 않거나, 유효하지 않은 양식입니다.",
        });
        console.log("로그인 fail");
      }
    }
  );
});

// user 회원가입
app.post("/user/register", (req, res) => {
  // console.log(req.body.regForm.username);
  console.log("setAccount ===== " + req.body.setAccount);
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
          let amount = web3.utils.toHex(web3.utils.toWei("10")); //10 TUT Token
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
                        // web3.eth.getBalance(toAddress);
                        console.log(res);
                      }
                    }
                  );
                }
              }
            );
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
          console.log("이미가입된 사용자입니다.");
          res.status(400).send({ message: "이미가입된 사용자입니다." });
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
        res.send(rows);
      }
    }
  });
});

// 강좌구매 시 작동(유효성 검사 구현) -규현
app.post("/crawling", (req, res) => {
  //크롤링
  const reqCnt = req.body.extractEng.length;
  let question = "";
  let answer = "";
  let correct = "";

  for (let i = 0; i < reqCnt; i++) {
    question += req.body.extractEng[i].word + "|";
    answer += req.body.extractEng[i].answer + "|";
    correct += req.body.extractEng[i].correct + "|";
    if (i === reqCnt - 1) {
      //마지막 구분자 제거
      question = question.slice(0, -1);
      answer = answer.slice(0, -1);
      correct = correct.slice(0, -1);
    }
  }

  let ary = [];

  ary = [6, answer, question, correct, 5, "e2k"];

  connection.query(
    "INSERT INTO qz (lec_id,answer,question,correct,qz_num,qz_category) values (?)",
    [ary],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("qz insert 성공");
        res.status(200).send();
      }
    }
  );
});

// 강좌구매 시 작동(유효성 검사 필요)
app.post("/user/payment", (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const result = jwt.verify(token);
  const info = req.body.lecInfo;
  console.log(info);
  const { lec_id, lec_price } = info;
  if (result.ok) {
    const { id, pwd, nickname } = result;
    // 유저와 일치하는 데이터를 찾기
    connection.query(
      "SELECT * FROM users where userName=?",
      id,
      function (err, rows, fields) {
        // 강의를 처음 구매할 시
        if (rows[0].taken_lectures == null) {
          connection.query(
            "UPDATE users SET taken_lectures = (?) WHERE userName = ?",
            [lec_id, id],
            function (err, rows) {
              connection.query(
                "INSERT INTO lecturestate(lec_name,userName,pass_state) values (?,?,?)",
                [lec_id, id, "none"]
              );
              res.status(200).send({ ok: true, message: lec_id });
              console.log(
                `${id}님이 lec_id : ${lec_id} 강좌를 구매하였습니다. lecturestate에 해당 정보를 저장합니다.`
              );
            }
          );
        } else {
          // 해당 유저의 강의에 현재 구매한 강의 아이디를 넣기
          const preLec = rows[0].taken_lectures;
          // 담고있는 lec_id를 새로 들어온 강의 id와 비교할 수 있게 숫자를 담은 배열로 변경하는 과정 -규현
          const aryPreLec = preLec.split("|");
          const numLec = aryPreLec.join("");
          const strLec = String(numLec);
          // mapfn : 배열 내 모든 요소를 숫자로 변경 https://hianna.tistory.com/707
          const mapfn = (arg) => Number(arg);
          const newLec = Array.from(strLec, mapfn);
          // 처음 구매하고 바로 다시 처음 강좌를 재구매 할 때
          if (preLec == lec_id) {
            console.log("이미 구매한 강좌입니다.");
            res.status(400).send({ ok: false, message: lec_id });
          }
          // 이후 중복 구매시
          else if (newLec.includes(lec_id)) {
            console.log("이미 구매한 강좌입니다.");
            res.status(400).send({ ok: false, message: lec_id });
          } else {
            // 새로운 값 추가할 때 "|"
            const ary = [preLec + "|" + lec_id];
            connection.query(
              "UPDATE users SET taken_lectures = (?) WHERE userName = ?",
              [[ary], id],
              function (err, rows) {
                connection.query(
                  "INSERT INTO lecturestate(lec_name,userName,pass_state) values (?,?,?)",
                  [lec_id, id, "none"]
                );
                res.status(200).send({ ok: true, message: lec_id });
                console.log(
                  `${id}님이 lec_id : ${lec_id} 강좌를 구매하였습니다. lecturestate에 해당 정보를 저장합니다.`
                );
              }
            );
          }
        }
        // User 지갑주소, 유저프라이빗키, lec_price 설정
        // 컨트렉트 작업 예시 test.js참조
        connection.query(
          "SELECT address, privatekey FROM users WHERE userName = ?",
          id,
          function (err, rows, fields) {
            if (err) {
              console.error(err);
            } else {
              if (rows.length < 1) {
                let lec_fromAddress = rows[0].address; ////user지갑주소
                let lec_privateKey = rows[0].privateKey; //user 프라이빗키 (보낼때 서명으로 쓰임)
                let lec_toAddress =
                  "0x4bFe6D25A7DACbCF9018a86eDd79A7168eBf6b7f"; // 받을계좌=>서버

                // 체크
                let contract = new web3.eth.Contract(
                  contractABI,
                  tokenAddress,
                  {
                    from: lec_fromAddress,
                  }
                );
                let amount = web3.utils.toHex(web3.utils.toWei(lec_price)); //lec_price로 TUT 갯수 설정
                let data = contract.methods
                  .transfer(lec_toAddress, amount)
                  .encodeABI();
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
          // https://velog.io/@yhe228/ERRHTTPHEADERSSENT-Cannot-set-headers-after-they-are-sent-to-the-client 런타임 오류 발생했음
        );
      }
    );
  } else {
    // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
    res.status(401).send({
      ok: false,
      message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
    });
  }
});

// test페이지에 데이터 보내기(유효성 검사 필요)
app.post("/user/testData", (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const result = jwt.verify(token);
  if (result.ok) {
    const { id, pwd, nickname } = result;
    // 유저와 일치하는 데이터를 찾기
    connection.query(
      "SELECT * FROM users where userName=?",
      id,
      function (err, rows, fields) {
        if (rows[0].taken_lectures == null) {
          res.status(201).send({ message: "보유한 강좌가 없습니다." });
        } else {
          const userLec = rows[0].taken_lectures.split("|");
          // [ '1', '2' ]
          let cunQuery = "lec_id in (?) ";
          for (let i = 1; i < userLec.length; i++) {
            if (userLec === 1) {
              cunQuery = "lec_id in (?) ";
            } else {
              cunQuery += "OR lec_id in (?)";
            }
          }
          connection.query(
            "select * from lecture where " + cunQuery + "",
            userLec,
            function (err, rows) {
              if (err) {
                console.log(err);
              } else {
                const lecData = rows;
                connection.query(
                  "SELECT lec_name,pass_state FROM lecturestate WHERE userName = ?",
                  id,
                  function (err, rows) {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(`${id}님이 보유 강좌 데이터를 불러왔습니다.`);
                      res.status(200).send({ lec: lecData, lecPass: rows });
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } else {
    // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
    res.status(401).send({
      ok: false,
      message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
    });
  }
});

app.post("/user/qzData", (req, res) => {
  const id = req.body.id;
  connection.query(
    "SELECT * FROM lecture WHERE lec_id = ?",
    id,
    function (err, rows) {
      if (err) {
        console.log(err);
      } else {
        const lec = rows[0];
        connection.query(
          "SELECT * FROM qz WHERE lec_id = ?",
          id,
          function (err, rows) {
            const result = rows;
            res.status(200).send({
              data: result,
              lec: lec,
            });
          }
        );
      }
    }
  );
});

app.post("/user/sendResult", (req, res) => {
  const token = req.headers.authorization.split("Bearer ")[1];
  const result = jwt.verify(token);
  const { currentLec, day } = req.body;
  if (result.ok) {
    const email = result.id;
    // 유저와 일치하는 데이터를 찾기
    connection.query(
      "SELECT * FROM lecturestate WHERE userName = ? AND lec_name = ?",
      [email, currentLec],
      function (err, rows) {
        const pass = rows[0].pass_state;
        if (pass == "none") {
          connection.query(
            "UPDATE lecturestate SET pass_state = (?) WHERE userName = ? AND lec_name = ?",
            [day, email, currentLec],
            function (err, rows) {
              if (err) {
                console.log(err);
              } else {
                console.log(
                  `${email}님이 ${currentLec} 강의의 ${day}일차 퀴즈를 통과했습니다.`
                );
                res.status(200).send({ ok: true, message: day, currentLec });
              }
            }
          );
        } else {
          // 여기서 부터는 0일차 이후
          if (day == "0") {
            // 만약 같은 0일차 통과시
            console.log(
              `${email}님은 ${currentLec} 강의의 ${day}일차 퀴즈를 이미 통과하였습니다.`
            );
            res
              .status(400)
              .send({ ok: false, message: "이미 통과한 퀴즈입니다." });
          } else {
            // 0일차가 아닌 다른 일차가 들어왔을 때 중복 확인
            // 데이터 "|" 부분을 없에고 배열 내 문자열을 숫자로 변경
            const splitPass = pass.split("|");
            const joinPass = splitPass.join("");
            const strPass = String(joinPass);
            const mapfn = (arg) => Number(arg);
            const newPass = Array.from(strPass, mapfn);
            // 중복확인
            if (newPass.includes(Number(day))) {
              console.log(
                `${email}님은 ${currentLec} 강의의 ${day}일차 퀴즈를 이미 통과하였습니다.`
              );
              res
                .status(400)
                .send({ ok: false, message: "이미 통과한 퀴즈입니다." });
            } else {
              // "|"를 추가해서 전송
              const ary = [pass + "|" + day];
              connection.query(
                "UPDATE lecturestate SET pass_state = (?) WHERE userName = ? AND lec_name = ?",
                [[ary], email, currentLec],
                function (err, rows) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(
                      `${email}님이 ${currentLec} 강의의 ${day}일차 퀴즈를 통과했습니다.`
                    );
                    res
                      .status(200)
                      .send({ ok: true, message: ary, currentLec });
                  }
                }
              );
            }
          }
        }
      }
    );
  } else {
    // 검증에 실패하거나 토큰이 만료되었다면 클라이언트에게 메세지를 담아서 응답합니다.
    res.status(401).send({
      ok: false,
      message: result.message, // jwt가 만료되었다면 메세지는 'jwt expired'입니다.
    });
  }
});

app.listen(port, () => {
  console.log(`✅ Connect at http://localhost:${port} 🚀`);
});

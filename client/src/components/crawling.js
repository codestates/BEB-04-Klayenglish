const { Visibility, VisibilityRounded } = require("@mui/icons-material");
const { style, display } = require("@mui/system");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const vm = require("vm");

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜
let day = today.getDay(); // 요일
let resToday = year + "" + month + "" + date; //오늘날짜 구하기

function getDateRangeData(param1, param2) {
  //param1은 시작일, param2는 종료일이다.
  var res_day = [];
  var ss_day = new Date(param1);
  var ee_day = new Date(param2);
  while (ss_day.getTime() <= ee_day.getTime()) {
    var _mon_ = ss_day.getMonth() + 1;
    _mon_ = _mon_ < 10 ? "0" + _mon_ : _mon_;
    var _day_ = ss_day.getDate();
    _day_ = _day_ < 10 ? "0" + _day_ : _day_;
    res_day.push(ss_day.getFullYear() + "" + _mon_ + "" + _day_);
    ss_day.setDate(ss_day.getDate() + 1);
  }
  return res_day;
}

const getHTML = async (paramDate) => {
  let url =
    "https://wquiz.dict.naver.com/endic/news/home.dict?targetDate=" + paramDate;
  try {
    return await axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const parsing = async (paramDate) => {
  const html = await getHTML(paramDate);
  const $ = cheerio.load(html.data);

  const tab1_kor = $(".article_answer_block").text();
  let tab1_eng = $(".quiz_answer_item._keyword_answer_item");
  let extractEng = []; //공백제거를 위해 생성

  tab1_eng.each((idx, node) => {
    extractEng.push({
      idx: idx,
      word: $(node)
        .text()
        .replace("오답입니다", "")
        .replace("정답입니다", "")
        .replace(".", "")
        .trim(),
      correct: $(node).attr("data-correct"),
      answer: tab1_kor,
    });
  });

  axios
    .post("http://localhost:3001/crawling", { extractEng })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response);
    });
};

const fromTo = getDateRangeData("2022-06-26", "2022-06-30"); //결과는 (-)하이픈 없이 나옴

for (let i = 0; i < fromTo.length; i++) {
  //   console.log(fromTo[i]);
  parsing(fromTo[i]);
}
// parsing("");

//파일생성
//   fs.writeFileSync(
//     "/home/parksk/Desktop/blockchain_5/team_klayenglish/BEB-04-Klayenglish/client/src/lib/" +
//       resToday +
//       ".json",
//     JSON.stringify(wordEngArray)
//   );
//   console.log(wordEngArray);

//   let course = [];
//   $courseList.each((idx, node) => {
//     //const title = $(node).find(".course_title").text();
//     //console.log(title);
//     course.push({
//       title: $(node).find(".course_title:eq(0)").text(), //첫번째것만 가져오기
//       instructor: $(node).find(".instructor").text(),
//       price: $(node).find(".price").text(),
//       rating: $(node).find(".star_solid").css("width"),
//       img: $(node).find(".card-image > figure > img").attr("src"),
//     });
//   });

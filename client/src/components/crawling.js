const { Visibility, VisibilityRounded } = require("@mui/icons-material");
const { style, display } = require("@mui/system");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1; // 월
let date = today.getDate(); // 날짜
let day = today.getDay(); // 요일
let resToday = year + "" + month + "" + date;

// let url = "https://wquiz.dict.naver.com/endic/news/home.dict?targetDate=20220721#tab=3";
const getHTML = async (keyword) => {
  let url =
    "https://wquiz.dict.naver.com/endic/news/home.dict?targetDate=20220701#tab=1";
  console.log("url = " + url);
  try {
    return await axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const parsing = async (keyword) => {
  const html = await getHTML(keyword);
  //   console.log(html);
  const $ = cheerio.load(html.data);
  //   const wordList = $(".word_list_item");
  const tab1_kor = $(".article_answer_block").text();
  const tab1_eng = $(".quiz_answer_item");

  console.log(tab1_kor);
  // tab1_eng.each((idx, node) => {
  //     console.log($(node).find(".quiz_answer_item._keyword_answer_item").text());
  // })
  //   let wordEngArray = [];
  //   let wordKorArray = [];

  //   wordList.each((idx, node) => {
  //     console.log($(node).find(".word_eng").text());
  //     wordEngArray.push({
  //       id: idx,
  //       wordEng: $(node).find(".word_eng").text(),
  //       wordKor: $(node).find(".word_kor").text(),
  //     });
  //   });
  //   aa.each((idx, node) => {
  //     const pp = $(node).find(".word_eng").text();
  //     console.log(idx + " | " + pp + " | ");
  //   });

  //파일생성
  //   fs.writeFileSync(
  //     "/home/parksk/Desktop/blockchain_5/team_klayenglish/BEB-04-Klayenglish/client/src/lib/" +
  //       resToday +
  //       ".json",
  //     JSON.stringify(wordEngArray)
  //   );
  //   console.log(wordEngArray);
};
//   const child = $(".quiz_answer_list > button").eq(0).text();

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

parsing("");

// type CardType = [
//   //타입 지정 dummy데이터가 4번이여서 4번 설정함
//   {
//     id: string;
//     src: string;
//     text: string;
//     label: string;
//     path: string;
//   },
//   {
//     id: string;
//     src: string;
//     text: string;
//     label: string;
//     path: string;
//   },
//   {
//     id: string;
//     src: string;
//     text: string;
//     label: string;
//     path: string;
//   },
//   {
//     id: string;
//     src: string;
//     text: string;
//     label: string;
//     path: string;
//   }
// ];

type CardType = {
  id: string;
  src: string;
  text: string;
  label: string;
  path: string;
};
// {
//   <Typeholder>(string: Typeholder): string;
// }
// src 는 이미지
// text 가격
// label 강좌 이름
// path는 이동 위치
const lectureList: CardType[] = [
  {
    id: "1",
    src: "/cash.png",
    text: "30tut ($90)",
    label: "캐쉬 영단어",
    path: "/aaa",
  },
  {
    id: "2",
    src: "/easy.png",
    text: "20tut ($60)",
    label: "이지 영단어",
    path: "/bbb",
  },
  {
    id: "3",
    src: "/hackers.png",
    text: "40tut ($120)",
    label: "해커스 영단어",
    path: "/ccc",
  },
  {
    id: "4",
    src: "/voca.png",
    text: "10tut ($30)",
    label: "기초 영단어",
    path: "/ddd",
  },
];

export default lectureList;

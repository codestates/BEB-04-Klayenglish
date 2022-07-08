type Props = {
  quizNum: number;
  quizMean: string;
  answerList: string[];
  answer: string;
  result: string;
};

// 배열일 경우 마지막에 []을 붙인다
const dummyQuiz: Props[] = [
  {
    quizNum: 1,
    quizMean: "묶다",
    answerList: ["bind", "till", "invent"],
    answer: "bind",
    result: "init",
  },
  {
    quizNum: 2,
    quizMean: "~조차도",
    answerList: ["matter", "even", "piece"],
    answer: "even",
    result: "init",
  },
  {
    quizNum: 3,
    quizMean: "그러나",
    answerList: ["however", "except", "through"],
    answer: "however",
    result: "init",
  },
  {
    quizNum: 4,
    quizMean: "극심한",
    answerList: ["total", "like", "intense"],
    answer: "intense",
    result: "init",
  },
  {
    quizNum: 5,
    quizMean: "~하지 않으면",
    answerList: ["flee", "unless", "succed"],
    answer: "unless",
    result: "init",
  },
  {
    quizNum: 6,
    quizMean: "~도 아닌",
    answerList: ["offcial", "nor", "guide"],
    answer: "nor",
    result: "init",
  },
  {
    quizNum: 7,
    quizMean: "흔들다",
    answerList: ["belong", "price", "swing"],
    answer: "swing",
    result: "init",
  },
  {
    quizNum: 8,
    quizMean: "평화",
    answerList: ["peace", "price", "promise"],
    answer: "peace",
    result: "init",
  },
  {
    quizNum: 9,
    quizMean: "~에 반대하여",
    answerList: ["chief", "against", "toy"],
    answer: "against",
    result: "init",
  },
  {
    quizNum: 10,
    quizMean: "정당",
    answerList: ["party", "teenager", "bomb"],
    answer: "party",
    result: "init",
  },
];

export default dummyQuiz;

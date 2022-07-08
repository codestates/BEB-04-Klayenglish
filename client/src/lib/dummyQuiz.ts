type Props = {
  quizNum: number;
  quizMean: string;
  answerList: string[];
  answer: string;
};

// 배열일 경우 마지막에 []을 붙인다
const dummyQuiz: Props[] = [
  {
    quizNum: 1,
    quizMean: "묶다",
    answerList: ["bind", "till", "invent"],
    answer: "bind",
  },
  {
    quizNum: 2,
    quizMean: "~조차도",
    answerList: ["matter", "even", "piece"],
    answer: "even",
  },
  {
    quizNum: 3,
    quizMean: "그러나",
    answerList: ["however", "except", "through"],
    answer: "however",
  },
  {
    quizNum: 4,
    quizMean: "극심한",
    answerList: ["total", "like", "intense"],
    answer: "intense",
  },
  {
    quizNum: 5,
    quizMean: "~하지 않으면",
    answerList: ["flee", "unless", "succed"],
    answer: "unless",
  },
  {
    quizNum: 6,
    quizMean: "~도 아닌",
    answerList: ["offcial", "nor", "guide"],
    answer: "nor",
  },
  {
    quizNum: 7,
    quizMean: "흔들다",
    answerList: ["belong", "price", "swing"],
    answer: "swing",
  },
  {
    quizNum: 8,
    quizMean: "평화",
    answerList: ["peace", "price", "promise"],
    answer: "peace",
  },
  {
    quizNum: 9,
    quizMean: "~에 반대하여",
    answerList: ["chief", "against", "toy"],
    answer: "against",
  },
  {
    quizNum: 10,
    quizMean: "정당",
    answerList: ["party", "teenager", "bomb"],
    answer: "party",
  },
];

export default dummyQuiz;

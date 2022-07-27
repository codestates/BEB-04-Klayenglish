import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import dummyQuiz from "../../lib/dummyQuiz";
import { useDispatch, useSelector } from "../../store";
import { quizActions } from "../../store/quizSlice";
import { useNavigate } from "react-router-dom";
import { resultActions } from "../../store/resultSlice";

const Base = styled.button`
  width: 40rem;
  position: relative;
  padding: 19px 20px 17px;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: ${palette.gray[200]};
  border: 1px solid ${palette.gray[200]};
  background-color: ${palette.black};
  border-radius: 1rem;
  margin-bottom: 1rem;
  transition: 0.5s;
  &:hover {
    background-color: ${palette.gray[200]};
    color: ${palette.black};
  }
  /*   &:active {
    background-color: ${(props) => props.color};
  } */
  @media screen and (max-width: 37.5rem) {
    width: 20rem;
  }
`;

interface Props {
  mean: string;
  words: string[];
  page: number;
  ans: string[];
}

const QuizBtn: React.FC<Props> = ({ mean, words, page, ans, ...props }) => {
  const navigate = useNavigate();
  const isCorrect = useSelector((state) => state.quiz.pass);
  const qzPage = useSelector((state) => state.quiz.page);
  const [pass, setPass] = useState(false);
  const [correct, setCorrect] = useState("");
  const [answer, setanswer] = useState("");

  const dispatch = useDispatch();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // currentTarget.vaule를 해야 지금 가지고 있는 단어를 알 수 있다.
    const clickedWord = e.currentTarget.value;
    const answer = ans.indexOf("1");
    const answerWord = words[answer];
    // 클릭 시 resultSlice에 정답과 맞았는지 여부를 삽입
    if (qzPage == 4) {
      if (clickedWord == answerWord) {
        console.log("correct");
        setPass(true);
      } else {
        setPass(false);
        console.log("fail");
      }
      dispatch(
        resultActions.resultData({
          page: qzPage,
          pass: pass,
          word: mean,
          answer: answerWord,
        })
      );
      // 마지막 페이지이므로 결과 페이지로 넘어감
      navigate("/testResult");
    }
    // 첫번째 페이지는 state에 저장이 안된채로 넘어가기 때문에 통과 유무에 따라서 dispatch를 별개로 진행
    else if (qzPage == 0) {
      if (clickedWord == answerWord) {
        setPass(true);
        dispatch(
          resultActions.resultData({
            page: qzPage,
            pass: true,
            word: mean,
            answer: answerWord,
          })
        );
        dispatch(quizActions.passQuiz());
      } else {
        setPass(false);
        dispatch(
          resultActions.resultData({
            page: qzPage,
            pass: false,
            word: mean,
            answer: answerWord,
          })
        );
        dispatch(quizActions.failQuiz());
      }
    } else {
      if (clickedWord == answerWord) {
        console.log("correct");
        setPass(true);
        dispatch(quizActions.passQuiz());
      } else {
        console.log("fail");
        setPass(false);
        dispatch(quizActions.failQuiz());
      }
      dispatch(
        resultActions.resultData({
          page: qzPage,
          pass: pass,
          word: mean,
          answer: answerWord,
        })
      );
    }
  };

  return (
    <>
      {words.map((word: string, index) => {
        return (
          <Base
            onClick={onClick}
            value={word}
            color={isCorrect ? palette.green[600] : palette.red[600]}
            key={index}
          >
            {word}
          </Base>
        );
      })}
    </>
  );
};

export default QuizBtn;

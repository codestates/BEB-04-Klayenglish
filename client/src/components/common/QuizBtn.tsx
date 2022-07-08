import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import dummyQuiz from "../../lib/dummyQuiz";
import { useDispatch, useSelector } from "../../store";
import { quizActions } from "../../store/quizSlice";

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
  words: string[];
  page: number;
}

const QuizBtn: React.FC<Props> = ({ words, page, ...props }) => {
  const isCorrect = useSelector((state) => state.quiz.pass);
  const dispatch = useDispatch();
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // currentTarget.vaule를 해야 지금 가지고 있는 단어를 알 수 있다.
    const clickedWord = e.currentTarget.value;
    const currentPageAnswer = dummyQuiz[page].answer;
    // dispatch를 통해 store에 있는 quizSlice상태를 변화시킴
    if (clickedWord == currentPageAnswer) {
      dispatch(quizActions.passQuiz());
      dummyQuiz[page].result = "pass";
    } else {
      dispatch(quizActions.failQuiz());
      dummyQuiz[page].result = "fail";
    }
  };

  return (
    <>
      {words.map((word: string) => {
        return (
          <Base
            onClick={onClick}
            value={word}
            color={isCorrect ? palette.green[600] : palette.red[600]}
          >
            {word}
          </Base>
        );
      })}
    </>
  );
};

export default QuizBtn;

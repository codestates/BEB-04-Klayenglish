import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TestResult from "./TestResult";
import Pagenum from "./common/Pagenum";
import QuizBtn from "./common/QuizBtn";
import dummyQuiz from "../lib/dummyQuiz";
import { useState } from "react";
import { useSelector, useDispatch } from "../store";
import { quizActions } from "../store/quizSlice";

const Base = styled.div`
  background-color: ${palette.black};
  height: 100%;
  color: ${palette.gray[200]};
  display: flex;
  flex-direction: column;
  .quiz_header {
    position: relative;
    padding: 15px 35px 14px;
    border-bottom: 1px solid ${palette.gray[600]};
    .quiz_title {
      font-size: 18px;
      font-weight: 600;
      line-height: 25px;
      text-align: center;
    }
    .quiz_back_btn {
      position: absolute;
      top: 18px;
      left: 18px;
      margin: -10px;
      padding: 10px;
      cursor: pointer;
      &:hover {
        color: inherit;
      }
    }
  }
  .quiz_container {
    clear: both;
    width: 100%;
    margin: 2rem auto;
    padding: 2rem 0;

    .quiz_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .multiple_title {
        text-align: center;
        margin-top: 1rem;
        font-weight: 600;
        font-size: 1.2rem;
        color: ${palette.blue[400]};
      }
      .multiple_question {
        margin-top: 1rem;
        margin-bottom: 2rem;
        font-size: 2rem;
      }
      .multiple_answer_list {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

const Test: React.FC = () => {
  const currentPage = useSelector((state) => state.quiz.page);
  const list = dummyQuiz[currentPage];
  const dispatch = useDispatch();
  const onResetClick = () => {
    if (currentPage == 0) {
      return;
    }
    dispatch(quizActions.backQuiz());
  };
  return (
    <Base>
      {currentPage == 10 ? (
        <TestResult />
      ) : (
        <>
          <div className="quiz_header">
            <h2 className="quiz_title">초급 단어 01</h2>
            <a className="quiz_back_btn" onClick={onResetClick}>
              <ArrowBackIcon />
            </a>
          </div>
          <div className="quiz_container">
            <div className="quiz_content">
              <Pagenum currentNum={list.quizNum} sumNum={10} />
              <h3 className="multiple_title">뜻에 맞는 단어를 고르세요.</h3>
              <strong className="multiple_question">{list.quizMean}</strong>
              <div className="multiple_answer_list">
                <QuizBtn words={list.answerList} page={currentPage} />
              </div>
            </div>
          </div>
        </>
      )}
    </Base>
  );
};

export default Test;

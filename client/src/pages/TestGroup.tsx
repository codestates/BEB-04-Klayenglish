import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
// components
import dummyQuiz from "../lib/dummyQuiz";
import TestLevel from "../components/common/TestLevel";
import Test from "../components/Test";
import TestList from "../components/TestList";
import dummyTestList from "../lib/dummyTestList";
import QuizItem from "../components/QuizItem";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// hooks
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "../store";
import { quizActions } from "../store/quizSlice";

const Base = styled.div`
  color: ${palette.gray[200]};
  .quiz-list-container {
    max-width: 40rem; // 640px
    width: 100%;
    min-height: 100%;
    // margin 마이너스 , padding에 동일하게 줘서 가운데 정렬시키기
    margin: -44px auto -113px;
    padding: 44px 0 113px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

    .quiz_header {
      position: relative;
      padding: 15px;
      border-bottom: 1px solid ${palette.gray[600]};
      display: flex;
      justify-content: space-between;
      .quiz_back_btn {
        margin: -10px 0;
        padding: 10px 0;
        cursor: pointer;
        &:hover {
          color: inherit;
        }
      }
      .quiz_expand_btn {
        margin: -10px 0;
        padding: 10px 0;
        cursor: pointer;
        &:hover {
          color: inherit;
        }
      }
    }

    .quiz-info {
      position: relative;
      text-align: center;
      z-index: 1;
      padding-top: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .quiz-title {
        margin-top: 0.8rem;
        font-size: 1.6rem;
      }
    }

    .quiz-list {
      margin: 30px 20px 0;
      padding-left: 0;
      padding-bottom: 20px;
    }
    @media (min-width: 768px) {
      .shortcut,
      #container {
        max-width: 83.8%;
        margin-left: auto;
        margin-right: auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
    }

    @media (min-width: 1024px) {
      .shortcut,
      #container {
        max-width: 68.4%;
      }
    }
  }
`;

const TestGroup: React.FC = () => {
  const { id } = useParams();
  const testList = dummyTestList[Number(id)];
  const { testId, testImg, testTitle, testLevel } = testList;
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <Base>
      <div className="quiz-list-container">
        <div className="quiz_header">
          <a className="quiz_back_btn" onClick={onBackClick}>
            <ArrowBackIcon />
          </a>
          <a className="quiz_expand_btn">
            <ExpandMoreIcon />
          </a>
        </div>
        <div className="quiz-info">
          <TestLevel level={testLevel} position="rel" />
          <h2 className="quiz-title">{testTitle}</h2>
          <p className="quiz-desc">10문제씩 500개 마스터 도전!</p>
        </div>
        <ul className="quiz-list">
          <QuizItem id={testId} />
          <QuizItem id={testId} />
          <QuizItem id={testId} />
          <QuizItem id={testId} />
          <QuizItem id={testId} />
        </ul>
      </div>
    </Base>
  );
};

export default TestGroup;

import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Pagenum from "../components/common/Pagenum";
import QuizBtn from "../components/common/QuizBtn";
import dummyQuiz from "../lib/dummyQuiz";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "../store";
import { quizActions } from "../store/quizSlice";
import { useNavigate } from "react-router-dom";
import Test from "../components/Test";
import TestList from "../components/TestList";
import dummyTestList from "../lib/dummyTestList";
import { modalActions } from "../store/modalSlice";

const Base = styled.div`
  color: ${palette.gray[200]};
  height: 100vh;
  .choseTest-logo {
    padding-top: 2rem;
    text-align: center;
  }
  .tests-list-container {
    .test-list {
      margin-top: 3rem;
      display: flex;
      // 화면 가운데에서 왼쪽부터 추가하는 방법을 모르겠다
      flex-wrap: wrap;
      justify-content: center;
    }
  }
`;

const ChoseTest: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  // map함수 실행
  const testList: JSX.Element[] = dummyTestList.map((el) => (
    <TestList id={el.testId} />
  ));

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin", { replace: true });
      dispatch(modalActions.openNeedLoginModalOpen());
    }
  }, [isLoggedIn, navigate]);
  return (
    <Base>
      <h1 className="choseTest-logo">Test</h1>
      {isLoggedIn ? (
        <div className="tests-list-container">
          <div className="test-list">{testList}</div>
        </div>
      ) : (
        ""
      )}
    </Base>
  );
};

export default ChoseTest;

import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import dummyQuiz from "../lib/dummyQuiz";
import { useDispatch, useSelector } from "../store";
import { quizActions } from "../store/quizSlice";

const Base = styled.div``;

interface Props {}

const TestResult: React.FC<Props> = () => {
  return (
    <Base>
      <div>result</div>
    </Base>
  );
};

export default TestResult;

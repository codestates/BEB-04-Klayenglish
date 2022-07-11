import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Pagenum from "../components/common/Pagenum";
import QuizBtn from "../components/common/QuizBtn";
import dummyQuiz from "../lib/dummyQuiz";
import { useState } from "react";
import { useSelector, useDispatch } from "../store";
import { quizActions } from "../store/quizSlice";
import Test from "../components/Test";

const Base = styled.div``;

const ChoseTest: React.FC = () => {
  return (
    <Base>
      <Test />
    </Base>
  );
};

export default ChoseTest;

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
import { useParams, useNavigate } from "react-router-dom";
import { miniQzActions } from "../store/miniQzSlice";

// result ㅍㅔ이지에서 뒤로가기 시  중첩 적용되는 오류 막기
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentPage = useSelector((state: any) => state.quiz.page);
  const qz = useSelector((state: any) => state.qz);
  const [quiz, setQuiz] = useState<any>([]);
  const list = quiz[currentPage];
  const onResetClick = () => {
    if (currentPage == 0) {
      console.log(list);
      console.log(list.answer.split("|"));
    } else {
      dispatch(quizActions.backQuiz());
    }
  };
  // page id에 따른 qzSlice의 5개 값을 퀴즈를 miniQzSlice에 저장
  useEffect(() => {
    if (Number(id) == 0) {
      for (let i = 0; i < 5; i++) {
        setQuiz((setQuiz: any) => [...setQuiz, qz[i]]);
        dispatch(
          miniQzActions.miniQzData({
            answer: qz[i].answer,
            correct: qz[i].correct,
            lec_id: qz[i].lec_id,
            question: qz[i].question,
            qz_category: qz[i].qz_category,
            qz_id: qz[i].qz_id,
            qz_num: qz[i].qz_num,
          })
        );
      }
    } else if (Number(id) == 5) {
      for (let i = 5; i < 10; i++) {
        setQuiz((setQuiz: any) => [...setQuiz, qz[i]]);
        dispatch(
          miniQzActions.miniQzData({
            answer: qz[i].answer,
            correct: qz[i].correct,
            lec_id: qz[i].lec_id,
            question: qz[i].question,
            qz_category: qz[i].qz_category,
            qz_id: qz[i].qz_id,
            qz_num: qz[i].qz_num,
          })
        );
      }
    } else if (Number(id) == 10) {
      for (let i = 10; i < 15; i++) {
        setQuiz((setQuiz: any) => [...setQuiz, qz[i]]);
        dispatch(
          miniQzActions.miniQzData({
            answer: qz[i].answer,
            correct: qz[i].correct,
            lec_id: qz[i].lec_id,
            question: qz[i].question,
            qz_category: qz[i].qz_category,
            qz_id: qz[i].qz_id,
            qz_num: qz[i].qz_num,
          })
        );
      }
    } else if (Number(id) == 15) {
      for (let i = 15; i < 20; i++) {
        setQuiz((setQuiz: any) => [...setQuiz, qz[i]]);
        dispatch(
          miniQzActions.miniQzData({
            answer: qz[i].answer,
            correct: qz[i].correct,
            lec_id: qz[i].lec_id,
            question: qz[i].question,
            qz_category: qz[i].qz_category,
            qz_id: qz[i].qz_id,
            qz_num: qz[i].qz_num,
          })
        );
      }
    } else if (Number(id) == 20) {
      for (let i = 20; i < 25; i++) {
        setQuiz((setQuiz: any) => [...setQuiz, qz[i]]);
        dispatch(
          miniQzActions.miniQzData({
            answer: qz[i].answer,
            correct: qz[i].correct,
            lec_id: qz[i].lec_id,
            question: qz[i].question,
            qz_category: qz[i].qz_category,
            qz_id: qz[i].qz_id,
            qz_num: qz[i].qz_num,
          })
        );
      }
    }
  }, []);
  // 데이터 불러오기 전까지 로딩
  if (quiz.length == 0) {
    return (
      <>
        <div>Loading</div>
      </>
    );
  }
  return (
    <Base>
      <div className="quiz_header">
        <h2 className="quiz_title">Quiz</h2>
        {/* 
        <a className="quiz_back_btn" onClick={onResetClick}>
          <ArrowBackIcon />
        </a> */}
      </div>
      <div className="quiz_container">
        <div className="quiz_content">
          <Pagenum currentNum={currentPage} sumNum={4} />
          <h3 className="multiple_title">뜻에 맞는 단어를 고르세요.</h3>
          <strong className="multiple_question">
            {list.answer.split("|")[1]}
          </strong>
          <div className="multiple_answer_list">
            <QuizBtn
              mean={list.answer.split("|")}
              words={list.question.split("|")}
              page={currentPage}
              ans={list.correct.split("|")}
              parm={id}
            />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Test;

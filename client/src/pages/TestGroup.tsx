import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
// components
import dummyQuiz from "../lib/dummyQuiz";
import TestLevel from "../components/common/TestLevel";
import TestList from "../components/TestList";
import dummyTestList from "../lib/dummyTestList";
import QuizItem from "../components/QuizItem";
// icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// hooks
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "../store";
import { quizActions } from "../store/quizSlice";
import { modalActions } from "../store/modalSlice";
import { qzActions } from "../store/qzSlice";
import { resultActions } from "../store/resultSlice";
import { miniQzActions } from "../store/miniQzSlice";
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
  type stateType = {
    level?: "master" | "diamond" | "bronze" | "gold" | "silver" | "challenger";
    name: string;
    source: string;
    lecId: any;
  };
  const [lec, setLec] = useState<stateType>({
    name: "",
    source: "",
    lecId: "",
  });
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const quiz = useSelector((state) => state.qz);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onBackClick = () => {
    navigate("/choseTest");
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin", { replace: true });
      dispatch(modalActions.openNeedLoginModalOpen());
    } else {
      const quizData = async () => {
        try {
          fetch("http://localhost:3001/user/qzData", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            // server로 클릭한 강좌 정보 전송
            body: JSON.stringify({ id }),
          }).then((res) =>
            res.json().then((result) => {
              const lecData = result.lec;
              const qz = result.data;
              setLec({
                level: lecData.lec_level,
                name: lecData.lec_name,
                source: lecData.lec_source,
                lecId: lecData.lec_id,
              });
              // 이미 다른 퀴즈 데이터가 저장되어 있다면 배열 초기화 후 데이터 삽입
              if (quiz.length > 1) {
                dispatch(quizActions.setPageNum({ page: 0, pass: "init" }));
                //퀴즈 데이터 슬라이스 초기화
                dispatch(qzActions.resetData());
                // 퀴즈 결과 슬라이스 초기화
                dispatch(resultActions.resetResultData());
                //5문제를 보관한 퀴즈 슬라이스(결과창을 위한) 초기화
                dispatch(miniQzActions.resetQzData());
              }
              // 디비에서 가져온 퀴즈 데이터 삽입
              qz.map((el: any) => {
                dispatch(
                  qzActions.qzData({
                    answer: el.answer,
                    correct: el.correct,
                    lec_id: el.lec_id,
                    question: el.question,
                    qz_category: el.qz_category,
                    qz_id: el.qz_id,
                    qz_num: el.qz_num,
                  })
                );
              });
            })
          );
        } catch (error) {
          console.error(error);
        }
      };
      quizData();
    }
  }, []);

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
          <TestLevel level={lec.level} position="rel" />
          <h2 className="quiz-title">
            {lec.name} {lec.source}
          </h2>
          <p className="quiz-desc">하루 5문제씩 도전!</p>
        </div>
        <ul className="quiz-list">
          <QuizItem id={0} num={1} lecId={lec.lecId} />
          <QuizItem id={5} num={2} lecId={lec.lecId} />
          <QuizItem id={10} num={3} lecId={lec.lecId} />
          <QuizItem id={15} num={4} lecId={lec.lecId} />
          <QuizItem id={20} num={5} lecId={lec.lecId} />
        </ul>
      </div>
    </Base>
  );
};

export default TestGroup;

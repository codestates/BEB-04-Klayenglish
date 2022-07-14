import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import dummyTestList from "../lib/dummyTestList";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface Props {
  id: number;
}

const Base = styled.li`
  float: left;
  width: 50%;
  :nth-child(2n) {
    padding-left: 7px;
  }
  :nth-child(2n-1) {
    padding-right: 7px;
  }
  :nth-child(n + 3) {
    margin-top: 1rem;
  }
  .quiz-item-inner {
    border-radius: 1rem;
    // overflow 기능을 사용하면 상위 태그에서 border-radius를 지정해도 적용됨. https://offbyone.tistory.com/296
    overflow: hidden;
    position: relative;
    text-align: center;
    .quiz-item-top {
      height: 4.4rem; //70px
      background-color: ${palette.gray[500]};
      .quiz-item-num {
        position: absolute;
        top: 8px;
        left: 10px;
        font-size: 18px;
        font-weight: bold;
        line-height: 21px;
      }
    }
    .correct-rate {
      position: absolute;
      width: 5rem;
      height: 5rem;
      top: 2rem;
      left: 6.5rem;
      background-color: ${palette.gray[400]};
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .quiz-item-bottom {
      padding: 50px 0 18px;
      background-color: ${palette.gray[200]};
      color: black;
    }
  }
`;

// 추후 각 퀴즈 아이템 데이터 별로 불러오는 로직 구현 필요

const QuizItem: React.FC<Props> = ({ id }) => {
  return (
    <Base className="quiz-item">
      <div className="quiz-item-inner">
        <div className="quiz-item-top">
          <span className="quiz-item-num">01</span>
        </div>
        <div className="correct-rate">
          <div className="correct-rate-text">정답률</div>
          <div className="correct-rate-per">
            <span className="correct-per-num">?</span>
          </div>
        </div>
        <div className="quiz-item-bottom">
          <Link to={`/test/${id}`}>
            퀴즈풀기
            <KeyboardArrowRightIcon />
          </Link>
        </div>
      </div>
    </Base>
  );
};

export default QuizItem;

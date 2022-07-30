import React, { useState, useEffect } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import dummyTestList from "../lib/dummyTestList";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSelector } from "../store";
interface Props {
  id: number;
  num: number;
  lecid: any;
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
      background-color: ${palette.blue[500]};
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
      background: linear-gradient(
        to right bottom,
        ${palette.blue[600]},
        ${palette.gray[400]}
      );
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
      .quiz-item-bottom-content {
        cursor: pointer;
        display: flex;
        justify-content: center;
      }
    }
  }
`;

// 추후 각 퀴즈 아이템 데이터 별로 불러오는 로직 구현 필요

const QuizItem: React.FC<Props> = ({ id, num, lecid }) => {
  const navigate = useNavigate();
  const [pass, setPass] = useState<any>();
  const passData = useSelector((state) => state.pass);
  // passSlice에서 해당 강좌id와 현재 페이지 id에 맞는 퀴즈 통과 여부를 가져온다.
  useEffect(() => {
    for (let i = 0; i < passData.length; i++) {
      if (Number(lecid) == passData[i].lecId) {
        if (passData[i].passed == "none") {
          return setPass(1);
        } else {
          if (Number(passData[i].passed) == 0) {
            return setPass(2);
          }
          // 하나라도 통과했다면 해당 길이에 +1 (기본 페이지는 1부터 시작이니까)
          return setPass(passData[i].passed.split("|").length + 1);
        }
      }
    }
    return setPass(0);
  });
  const onClick = () => {
    if (num == 1) {
      // 1일차는 기본으로 제공되어야 하기 때문
      navigate(`/test/${id}`);
    } else if (Number(pass) < num) {
      // 2일차까지 퀴즈를 통과한다면 pass state의 값은 3이므로 3일차 퀴즈를 진행할 수 있다.
      return alert("이전 퀴즈를 통과해야 다음 단계로 넘어갈 수 있습니다!");
    } else {
      navigate(`/test/${id}`);
    }
  };

  return (
    <Base className="quiz-item">
      <div className="quiz-item-inner">
        <div className="quiz-item-top">
          <span className="quiz-item-num">{num}</span>
        </div>
        <div className="correct-rate">
          <div className="correct-rate-text">{num}일차</div>
        </div>
        <div className="quiz-item-bottom">
          <div className="quiz-item-bottom-content" onClick={onClick}>
            퀴즈풀기
            <KeyboardArrowRightIcon />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default QuizItem;

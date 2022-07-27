import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import dummyQuiz from "../lib/dummyQuiz";
import { useDispatch, useSelector } from "../store";
import { quizActions } from "../store/quizSlice";
import ResultList from "../components/common/ResultList";
import ReplayIcon from "@mui/icons-material/Replay";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Dns } from "@mui/icons-material";

const Base = styled.div`
  color: ${palette.gray[200]};
  max-width: 640px;
  width: 100%;
  min-height: 100%;
  margin: -44px auto -113px;
  padding: 44px 0 113px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  .quiz_result {
    padding-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .result_menu {
      display: flex;
      .result_menu_item {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 1rem 1rem;
        padding: 1rem 1rem;
      }
      .link_icon {
        font-size: 3rem;
        color: ${palette.blue[500]};
      }
    }
    .correct-rate {
      width: 10rem;
      height: 10rem;
      background: linear-gradient(
        to right bottom,
        ${palette.blue[500]},
        ${palette.gray[600]}
      );
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .correct-rate-text {
        font-size: 1rem;
      }
      .correct-per-num {
        font-size: 3rem;
      }
    }
  }
  .result_list {
    padding-left: 0rem;
  }
  @media only screen and (min-width: 1024px) {
    max-width: 50.4%;
  }
  @media only screen and (min-width: 768px) {
    max-width: 60.8%;
    margin-left: auto;
    margin-right: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

interface Props {}

const TestResult: React.FC<Props> = () => {
  const qzResult = useSelector((state) => state.result);
  const qz = useSelector((state) => state.miniQz);
  const resultList: JSX.Element[] = qzResult.map((el, index) => (
    <ResultList key={index} answer={el.answer} word={el.word} pass={el.pass} />
  ));
  let i = 0;
  qzResult.forEach((el) => {
    if (el.pass) {
      i++;
    }
    return;
  });
  let mathI = (i / 5) * 100;
  return (
    <Base>
      <div className="quiz_result">
        <div className="correct-rate">
          <div className="correct-rate-text">정답률</div>
          <div className="correct-rate-per">
            <span className="correct-per-num">{mathI}%</span>
          </div>
        </div>
        <ul className="result_menu">
          <li className="result_menu_item">
            <div className="list">
              <FormatListBulletedIcon className="link_icon" />
            </div>
            <div className="link_text">목록</div>
          </li>
          <li className="result_menu_item divide">
            <div className="list">
              <ReplayIcon className="link_icon" />
            </div>
            <div className="link_text">다시 풀기</div>
          </li>
          <li className="result_menu_item">
            <div className="list">
              <HomeIcon className="link_icon" />
            </div>
            <div className="link_text">홈</div>
          </li>
        </ul>
      </div>
      <ul className="result_list">{resultList}</ul>
    </Base>
  );
};

export default TestResult;

import React, { useEffect } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import dummyQuiz from "../lib/dummyQuiz";
import { quizActions } from "../store/quizSlice";
import { resultActions } from "../store/resultSlice";
import { miniQzActions } from "../store/miniQzSlice";
import { useNavigate, useParams } from "react-router-dom";
import ResultList from "../components/common/ResultList";
import ReplayIcon from "@mui/icons-material/Replay";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

// accountSlice 사용에 필요한 툴
// useDispatch -> action을 통해서 account값을 바꿀 수 있다.
//ex)const dispatch = useDispatch();
//  dispatch(accountActions.setAccount({ account: "thisIsAccount" }));

// useSelector -> useSelector로 store에 있는 account값을 가져올 수 있다. ex) const accountValue = useSelector((state) => state.account);
import { useDispatch, useSelector } from "../store";
import { accountActions } from "../store/accountSlice";

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
      padding-left: 0rem;
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qzResult = useSelector((state) => state.result);
  const qz = useSelector((state) => state.miniQz);
  const currentLec = qz[0].lec_id;
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
  // 다시 풀기
  const onRetry = () => {
    // 전체퀴즈 데이터 제외 전부 초기화 세팅
    dispatch(quizActions.setPageNum({ page: 0, pass: "init" }));
    dispatch(resultActions.resetResultData());
    dispatch(miniQzActions.resetQzData());
    // 현재 주차에 맞는 아이디로 이동
    navigate(`/test/${id}`);
  };
  // 80% 정답률을 가지고 있다면 DB전송해서 1d 값 저장
  useEffect(() => {
    if (mathI >= 80) {
      console.log(`pass! lec_id = ${currentLec}`);
      const token: any = localStorage.getItem("accessToken");
      const parseToken: any = JSON.parse(token);
      const resultData = async () => {
        try {
          fetch("http://localhost:3001/user/sendResult", {
            method: "post",
            headers: {
              // content-type를 해줘야 body의 stringify 값을 전송할 수 있다.
              "content-type": "application/json",
              // 토큰을 통한 유저 검증
              authorization: `Bearer ${parseToken.accessToken}`,
            },
            // server로 현재 강좌 정보 전송
            body: JSON.stringify({ currentLec: currentLec, day: id }),
          }).then((res) =>
            res.json().then((result) => {
              console.log(result);
            })
          );
        } catch (error) {
          console.error(error);
        }
      };
      resultData();
    } else {
      console.log(`fail! try again`);
    }
  });

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
          <li
            className="result_menu_item"
            onClick={() => navigate(`/testgroup/${currentLec}`)}
          >
            <div className="list">
              <FormatListBulletedIcon className="link_icon" />
            </div>
            <div className="link_text">목록</div>
          </li>
          <li className="result_menu_item" onClick={onRetry}>
            <div className="list">
              <ReplayIcon className="link_icon" />
            </div>
            <div className="link_text">다시 풀기</div>
          </li>
          <li className="result_menu_item" onClick={() => navigate(`/`)}>
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

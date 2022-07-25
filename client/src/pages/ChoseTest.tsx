import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Pagenum from "../components/common/Pagenum";
import QuizBtn from "../components/common/QuizBtn";
import dummyQuiz from "../lib/dummyQuiz";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "../store";
import { lectureActions } from "../store/lectureSlice";
import { useNavigate } from "react-router-dom";
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
  const lecture = useSelector((state) => state.lecture);
  // map함수 실행
  const testList: JSX.Element[] = dummyTestList.map((el) => (
    <TestList id={el.testId} />
  ));

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin", { replace: true });
      dispatch(modalActions.openNeedLoginModalOpen());
    } else {
      const testData = async () => {
        const token: any = localStorage.getItem("accessToken");
        const parseToken: any = JSON.parse(token);
        try {
          fetch("http://localhost:3001/user/testData", {
            method: "post",
            headers: {
              // 강좌를 구매한 유저 정보를 식별하기 위한 토큰 전송(DB에서 해당 유저에게 구매한 강좌를 저장시키기 위함)
              authorization: `Bearer ${parseToken.accessToken}`,
            },
            // server로 클릭한 강좌 정보 전송
            body: JSON.stringify({}),
          }).then((res) =>
            res.json().then((result) => {
              console.log(result.message);
              const {
                lec_id,
                lec_image_path,
                lec_level,
                lec_name,
                lec_source,
              } = result.message;
              dispatch(
                lectureActions.setLecture({
                  id: lec_id,
                  image: lec_image_path,
                  level: lec_level,
                  name: lec_name,
                  source: lec_source,
                })
              );
              console.log(lecture);
            })
          );
        } catch (error) {
          console.error(error);
        }
      };
      testData();
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

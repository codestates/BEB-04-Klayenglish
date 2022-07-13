import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import TestLevel from "./common/TestLevel";
import Test from "./Test";
import { Link } from "react-router-dom";

const Base = styled.div`
  box-sizing: border-box;
  position: relative;
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20rem;
  cursor: pointer;
  &:hover {
    .test-image {
      transform: scale(1.1);
    }
    .text-box-detail-container {
      bottom: 5rem;
    }
  }
  .test-image-container {
    overflow: hidden;
    margin: 0 auto;
    border-radius: 0.5rem;
  }
  .test-image {
    transition: all 0.5s;
    max-width: 22rem;
    border-radius: 0.5rem;
  }
  .text-box-detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: absolute;
    bottom: 4.5rem;
    width: 20rem;
    border-radius: 0.5rem;
    background-color: #374151;
    text-align: center;
    transition: all 0.5s;
    .text-box-detail {
      margin-top: 0.3rem;
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
    .test-complete-bar {
      height: 0.75rem;
      width: 90%;
      background-color: ${palette.gray[200]};
      border-radius: 1rem;
    }
    .test-complete-total {
      margin-top: 0.5rem;
      margin-bottom: 0.3rem;
    }
  }
`;

const TestList: React.FC = () => {
  return (
    <Link to="/test">
      <Base>
        {/* 추후 level에도 난이도 데이터 삽입 */}
        <TestLevel level="고급" />
        <div className="test-image-container">
          <span>
            <img
              className="test-image"
              src="https://nomadcoders.co/_next/image?url=https%3A%2F%2Fd1telmomo28umc.cloudfront.net%2Fmedia%2Fpublic%2Fthumbnails%2FreduxThumbnail_iZI93yi.jpg&w=3840&q=75"
            />
          </span>
        </div>
        <div className="text-box-detail-container">
          <span className="text-box-detail">초보자를 위한 리덕스</span>
          <div className="test-complete-bar"></div>
          <span className="test-complete-total">0% complete</span>
        </div>
      </Base>
    </Link>
  );
};

export default TestList;

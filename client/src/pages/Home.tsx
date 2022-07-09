import React, { useEffect } from "react";
import styled from "styled-components";
import palette from "../styles/palette";

const Base = styled.div`
  background-color: ${palette.black};
  height: 100%;
  color: ${palette.gray[200]};

  .Home-description {
    padding-top: 10rem; // 160px
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2rem; // 32px
    font-weight: 700;
  }
`;

const Home: React.FC = () => {
  return (
    <Base>
      <div className="Home-description">
        <span>변화의 시작은 매우 쉽습니다.</span>
        <span>올바른 선택 하나로 당신도 지금 시작할 수 있습니다.</span>
        <span>클레잉글리쉬와 함께 성장하는 나로 시작하세요.</span>
      </div>
    </Base>
  );
};

export default Home;

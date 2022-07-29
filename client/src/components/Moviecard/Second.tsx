import React from "react";
import styled from "styled-components";

const Base = styled.div`
  .card {
    width: 350px;
    height: 200px;
    cursor: pointer;
  }
  .src {
    width: 305px;
    height: 200px;
    cursor: pointer;
  }
`;

const Second: React.FC = () => {
  return (
    <Base>
      <div className="card">
        <a href="https://www.youtube.com/watch?v=YfhsuGxPv-E">
          <img className="src" src="screen2.png" alt="구글바로가기"></img>
        </a>
      </div>
    </Base>
  );
};

export default Second;

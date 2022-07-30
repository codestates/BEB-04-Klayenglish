import React from "react";
import styled from "styled-components";

const Base = styled.div`
  .card {
    width: 350px;
    height: 200px;
  }
  .src {
    width: 305px;
    height: 200px;
  }
`;

const Three: React.FC = () => {
  return (
    <Base>
      <div className="card">
        <a href="https://www.youtube.com/watch?v=TGq7lKHAIs0">
          <img className="src" src="screen3.png" alt="구글바로가기"></img>
        </a>
      </div>
    </Base>
  );
};

export default Three;

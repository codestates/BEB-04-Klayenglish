import React from "react";
import styled from "styled-components";

const Base = styled.div`
  .card {
    width: 350px;
    height: 200px;
  }
  .src {
    width: 320px;
    height: 200px;
  }
`;

const First: React.FC = () => {
  return (
    <Base>
      <div className="card">
        <a href="https://www.youtube.com/watch?v=aSKKfo7oEKU&t=8581s">
          <img className="src" src="screen.png" alt="구글바로가기"></img>
        </a>
      </div>
    </Base>
  );
};

export default First;

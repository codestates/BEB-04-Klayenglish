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

const Five: React.FC = () => {
  return (
    <Base>
      <div className="card">
        <a href="https://www.youtube.com/watch?v=FU4Pkcm-TAA">
          <img className="src" src="screen5.png" alt="구글바로가기"></img>
        </a>
      </div>
    </Base>
  );
};

export default Five;

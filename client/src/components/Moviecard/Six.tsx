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

const Six: React.FC = () => {
  return (
    <Base>
      <div className="card">
        <a href="https://www.youtube.com/watch?v=YW6S4_wg0N8">
          <img className="src" src="screen7.png" alt="구글바로가기"></img>
        </a>
      </div>
    </Base>
  );
};

export default Six;

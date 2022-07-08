import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const PageNumber = styled.span``;

const Base = styled.div`
  position: relative;
  .page_div {
    position: absolute;
    top: -2rem;
    width: 3rem;
    left: 8rem;
    padding: 2px 4px 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: -0.5px;
    text-align: center;
    border-radius: 13px;
    border: solid 1px ${palette.gray[600]};
    box-sizing: border-box;
    // 1240px
    @media screen and (min-width: 1240px) {
      left: 20rem;
    }
    // 600px
    @media screen and (min-width: 700px) {
      left: 17rem;
    }
  }
  ${PageNumber} {
    font-weight: 500;
    line-height: 19px;
    letter-spacing: -0.5px;
    text-align: center;
  }
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  currentNum: number;
  sumNum: number;
}

const Pagenum: React.FC<Props> = ({ currentNum, sumNum, ...props }) => {
  return (
    <Base>
      <div className="page_div" {...props}>
        <PageNumber>{currentNum}</PageNumber>
        <PageNumber>/ {sumNum}</PageNumber>
      </div>
    </Base>
  );
};

export default Pagenum;

import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

interface BaseProps {
  level?: "고급" | "중급" | "초급";
}

const getLevelColor = (level?: "고급" | "중급" | "초급") => {
  switch (level) {
    case "고급":
      return css`
        background-color: ${palette.purple[100]};
        color: ${palette.purple[600]};
      `;
    case "중급":
      return css`
        background-color: ${palette.green[100]};
        color: ${palette.green[400]};
      `;
    case "초급":
      return css`
        background-color: ${palette.yellow[100]};
        color: ${palette.yellow[500]};
      `;
  }
};

const Base = styled.div<BaseProps>`
  z-index: 1;
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 1rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  text-align: center;
  box-shadow: 0 2px 5px ${palette.black};
  ${({ level }) => getLevelColor(level)}
`;

interface Props {
  level?: "고급" | "중급" | "초급";
}

const TestLevel: React.FC<Props> = ({ level }) => {
  return <Base level={level}>{level}</Base>;
};

export default TestLevel;

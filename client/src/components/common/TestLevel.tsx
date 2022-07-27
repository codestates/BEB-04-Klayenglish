import { positions } from "@mui/system";
import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

interface BaseProps {
  level?: "master" | "diamond" | "bronze" | "gold" | "silver" | "challenger";
  position?: "ab" | "rel";
}

const getLevelColor = (
  level?: "master" | "diamond" | "bronze" | "gold" | "silver" | "challenger"
) => {
  switch (level) {
    case "master":
      return css`
        background-color: ${palette.purple[100]};
        color: ${palette.purple[600]};
      `;
    case "diamond":
      return css`
        background-color: ${palette.blue[100]};
        color: ${palette.blue[400]};
      `;
    case "bronze":
      return css`
        background-color: ${palette.yellow[300]};
        color: ${palette.yellow[800]};
      `;
    case "gold":
      return css`
        background-color: ${palette.yellow[100]};
        color: ${palette.yellow[500]};
      `;
    case "silver":
      return css`
        background-color: ${palette.gray[100]};
        color: ${palette.gray[500]};
      `;
    case "challenger":
      return css`
        background-color: ${palette.black};
        color: ${palette.yellow[400]};
      `;
  }
};

const getPosition = (position?: "ab" | "rel") => {
  switch (position) {
    case "ab":
      return css`
        position: absolute;
        top: 10px;
        left: 10px;
      `;
    case "rel":
      return css`
        position: relative;
      `;
  }
};

const Base = styled.div<BaseProps>`
  z-index: 1;
  border-radius: 1rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  text-align: center;
  box-shadow: 0 2px 5px ${palette.black};
  ${({ position }) => getPosition(position)}
  ${({ level }) => getLevelColor(level)}
`;

// extends React.HTMLAttributes<HTMLDivElement> 처럼 확장을 해줘야 className 등 여러 옵션을 추가적용할 수 있다.
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  level?: "master" | "diamond" | "bronze" | "gold" | "silver" | "challenger";
  position?: "ab" | "rel";
}

// ...props 를 넣어야 다른 곳에서 className 적용가능
const TestLevel: React.FC<Props> = ({ level, position, ...props }) => {
  return (
    <Base level={level} position={position} {...props}>
      {level}
    </Base>
  );
};

export default TestLevel;

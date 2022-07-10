import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

interface BaseProps {
  orientation?: "horizontal" | "vertical";
}

const Base = styled.div<BaseProps>`
  height: 1px;
  background-color: ${palette.gray[500]};

  ${({ orientation }) =>
    orientation === "vertical" &&
    css`
      height: 100%;
      width: 1px;
    `}
`;

interface Props {
  orientation?: "horizontal" | "vertical";
}

const Divider: React.FC<Props> = ({ orientation }) => {
  return <Base orientation={orientation} />;
};

export default Divider;

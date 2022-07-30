import { css } from "styled-components";
import styled from "styled-components";
import React from "react";
import palette from "../../styles/palette";

const getStatus = (size?: 0 | 1 | 2 | 3 | 4 | 5) => {
  switch (size) {
    case 1:
      return css`
        z-index: 2;
        background-color: ${palette.blue[500]};
        padding-right: 4rem;
        border-radius: 1rem;
      `;
    case 2:
      return css`
        z-index: 2;
        background-color: ${palette.blue[500]};
        padding-right: 6rem;
        border-radius: 1rem;
      `;
    case 3:
      return css`
        z-index: 2;
        background-color: ${palette.blue[500]};
        padding-right: 10rem;
        border-radius: 1rem;
      `;
    case 4:
      return css`
        z-index: 2;
        background-color: ${palette.blue[500]};
        padding-right: 14rem;
        border-radius: 1rem;
      `;
    case 5:
      return css`
        z-index: 2;
        background-color: ${palette.blue[500]};
        padding-right: 18rem;
        border-radius: 1rem;
      `;
  }
};

interface BaseProps {
  size?: 0 | 1 | 2 | 3 | 4 | 5;
}

const Base = styled.span<BaseProps>`
  ${({ size }) => getStatus(size)};
`;

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 0 | 1 | 2 | 3 | 4 | 5;
}

const Bar: React.FC<Props> = ({ size }) => {
  return <Base size={size}> </Base>;
};

export default Bar;

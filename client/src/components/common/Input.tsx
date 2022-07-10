import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

interface BaseProps {
  validated?: boolean;
  width?: string;
}

const Base = styled.input<BaseProps>`
  height: 2.5rem; // 40px
  border: 1px solid ${palette.gray[200]};
  outline: none;
  border-radius: 0.25rem; // 4px
  padding: 0.5rem; // 8px
  ${({ validated }) =>
    !validated &&
    css`
      border: 1px solid ${palette.red[500]};
    `}

  width: ${({ width }) => width};
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  validated?: boolean;
}

const Input: React.FC<Props> = ({ validated = true, width, ...props }) => {
  return <Base validated={validated} width={width} {...props} />;
};

export default Input;

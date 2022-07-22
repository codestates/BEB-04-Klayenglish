import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 2rem;
  background-color: ${palette.green[600]};
  border-radius: 1rem;
  -webkit-transform-origin: 100% 0%;
  transform-origin: 100% 0%;
  animation: box 8s ease-in-out;
  .text {
    color: ${palette.gray[200]};
    margin-bottom: 0.5rem;
  }

  .loader4 {
    position: relative;
    width: 150px;
    height: 0.5rem;

    top: 45%;
    top: -webkit-calc(50% - 10px);
    top: calc(50% - 10px);
    left: 25%;
    left: -webkit-calc(50% - 75px);
    left: calc(50% - 75px);

    background-color: rgba(255, 255, 255, 0.2);
  }

  .loader4:before {
    content: "";
    position: absolute;
    background-color: #fff;
    top: 0px;
    left: 0px;
    height: 0.5rem;
    width: 0px;
    z-index: 0;
    opacity: 1;
    transform-origin: 100% 0%;
    animation: loader4 5s ease-in-out infinite;
  }

  .loader4:after {
    color: #fff;
    font-weight: 200;
    position: absolute;
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    left: 0;
    top: 0;
  }

  @keyframes loader4 {
    0% {
      width: 0px;
    }
    70% {
      width: 100%;
      opacity: 1;
    }
    90% {
      opacity: 0;
      width: 100%;
    }
    100% {
      opacity: 0;
      width: 0px;
    }
  }
  @keyframes box {
    100% {
      opacity: 0;
    }
  }
`;

// extends React.HTMLAttributes<HTMLDivElement> 처럼 확장을 해줘야 className 등 여러 옵션을 추가적용할 수 있다.
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

// ...props 를 넣어야 다른 곳에서 className 적용가능
const AlertModal: React.FC<Props> = ({ message, ...props }) => {
  return (
    <Base {...props}>
      <span className="text">{message}</span>
      <div className="loader4"></div>
    </Base>
  );
};

export default AlertModal;

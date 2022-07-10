import React from "react";
// about css
import styled from "styled-components";
import palette from "../styles/palette";
// icon
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// common
import Input from "../components/common/Input";
import Divider from "../components/common/Divider";
// hooks
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "../store";
import { userActions } from "../store/userSlice";

const Base = styled.div`
  background-color: ${palette.black};
  height: 100%;
  color: ${palette.gray[200]};
  display: flex;
  flex-direction: column;
  align-items: center;
  .login_logo {
    font-size: 2.5rem;
    font-weight: 600;
    color: ${palette.gray[300]};
    padding-bottom: 0.5rem;
    margin-top: 5.5rem;
  }
  .login_form {
    display: flex;
    flex-direction: column;
    border: 1px solid ${palette.gray[600]};
    gap: 1rem;
    max-height: 30rem;
    max-width: 22rem;
    width: 100%;
    padding: 20px;
    border-radius: 1rem;

    .validation_text {
      color: ${palette.red[500]};
      font-size: 0.875rem; // 14px
    }
    .login_btn {
      font-size: 1.2rem;
      padding: 0.7rem;
      border-radius: 0.3rem;
      border: none;
      background-color: ${palette.gray[500]};
      color: #ffff;
      cursor: pointer;
      transition: 0.3s;
      text-align: center;
      :hover {
        background-color: ${palette.gray[600]};
      }
      :active {
        transform: scale(0.9);
      }
    }
    .forgot_pw {
      text-align: center;
      font-size: 0.8rem;
      font-weight: 500;
      margin-bottom: 0;
      cursor: pointer;

      :hover {
        text-decoration: underline;
      }
    }
    .createAccount_btn_container {
      display: flex;
      justify-content: center;
      .createAccount_btn {
        text-align: center;
        font-size: 1.2rem;
        margin: 1rem;
        padding: 0.7rem;
        border-radius: 0.3rem;
        border: none;
        background-color: ${palette.green[500]};
        color: #ffff;
        cursor: pointer;
        transition: 0.3s;
        :hover {
          background-color: ${palette.green[600]};
        }
        :active {
          transform: scale(0.9);
        }
      }
    }
    .password_container {
      cursor: pointer;
      position: absolute;
      color: ${palette.gray[400]};
      transition: 0.3s;
      &:hover {
        color: ${palette.gray[600]};
      }
      .password_container_visibile {
        position: relative;
        top: 4rem;
        left: 17rem;
      }
    }
  }
`;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(true);
  // passwordType state
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidated(true);
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidated(true);
    setPassword(e.target.value);
  };
  // password type을 변경하는 함수
  const onVisible = () => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      } else {
        return { type: "password", visible: false };
      }
    });
  };

  return (
    <Base>
      <h1 className="login_logo">Klayenglish</h1>
      <form className="login_form">
        <Input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
        />
        <Input
          type={passwordType.type}
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
        <div className="password_container" onClick={onVisible}>
          <div className="password_container_visibile">
            {!passwordType.visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        </div>
        {!validated && (
          <p className="validation_text">
            이메일 또는 비밀번호가 잘못되었습니다.
          </p>
        )}
        <button className="login_btn">로그인</button>
        <p className="forgot_pw" onClick={() => navigate("/password")}>
          비밀번호를 잊으셨나요?
        </p>
        <Divider />
        <div className="createAccount_btn_container">
          <div
            className="createAccount_btn"
            onClick={() => navigate("/signup")}
          >
            새 계정 만들기
          </div>
        </div>
      </form>
    </Base>
  );
};

export default SignIn;

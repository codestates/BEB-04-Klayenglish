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
import AlertModal from "../components/common/AlertModal";
// hooks
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "../store";
import { userActions } from "../store/userSlice";
import { modalActions } from "../store/modalSlice";
import axios from "../lib/api";
const Base = styled.div`
  background-color: ${palette.black};
  height: 100%;
  color: ${palette.gray[200]};
  display: flex;
  flex-direction: column;
  align-items: center;
  .login_logo {
    font-size: 2.5rem;
    font-weight: 500;
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
        border-radius: 10px;
        border: none;
        background: linear-gradient(to right top, #da246c, #ff9426);
        color: #ffff;
        cursor: pointer;
        transition: 0.3s;
        :hover {
          background: linear-gradient(to right top, #b81e5c, #d97d21);
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
  .login-modal {
    bottom: 3rem;
    right: 2rem;
  }
`;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(true);
  // passwordType state -규현
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const loginModal = useSelector((state) => state.modal.needLoginModalOpen);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidated(true);
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValidated(true);
    setPassword(e.target.value);
  };
  // password type을 변경하는 함수 -규현
  const onVisible = () => {
    setPasswordType(() => {
      if (!passwordType.visible) {
        return { type: "text", visible: true };
      } else {
        return { type: "password", visible: false };
      }
    });
  };
  const [msg, setMsg] = useState("");
  // 로그인 버튼 -규현
  const login = async (event: React.MouseEvent<HTMLButtonElement>) => {
    //console.log("id = " + id + "pwd = " + pwd);
    try {
      fetch("http://localhost:3001/user/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ id: email, pwd: password }),
      }).then((res) => {
        if (res.status >= 200 && res.status <= 204) {
          // msg -> 서버에서 보내오는 데이터
          res
            .json()
            .then((msg) =>
              localStorage.setItem("accessToken", JSON.stringify(msg["data"]))
            );
          console.log("클라이언트 로그인성공");
          dispatch(userActions.setLoggedIn());
        } else if (res.status == 400) {
          navigate("/signin");
          res.json().then((msg) => alert(msg.message));
          // 다시 로그인 양식 기입하게끔 -규현
        }
        console.log(res.status);
        if (res.status >= 400) {
          console.log("해당 입력이 잘못되었습니다.");
        }
      });
    } catch (error) {
      console.log(error);
    }
    // error 메시지 확인 가능 -규현 https://krpeppermint100.medium.com/ts-nodejs-express%EC%9D%98-%EC%9A%94%EC%B2%AD-%EC%9D%91%EB%8B%B5-%EC%97%90%EB%9F%AC-%ED%95%B8%EB%93%A4%EB%A7%81-8943ab7bd13b
    navigate("/");
  };
  // 로그인 안하고 test 페이지 접근시 뜨는 모달 -규현
  const needLogin = () => {
    setTimeout(() => {
      dispatch(modalActions.closeNeedLoginModalOpen());
    }, 5000);
  };
  // 로그인 되어있으면 리다이렉트 -규현
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    } else if (loginModal) {
      needLogin();
    }
  });

  return (
    <Base>
      <h1 className="login_logo">Sign in to Klayenglish</h1>
      <form className="login_form">
        <Input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={onChangeEmail}
        />
        <Input
          type={passwordType.type}
          placeholder="Password"
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
        <button className="login_btn" onClick={login}>
          Continue
        </button>
        <p className="forgot_pw" onClick={() => navigate("/password")}>
          비밀번호를 잊으셨나요?
        </p>
        <Divider />
        <div className="createAccount_btn_container">
          <div
            className="createAccount_btn"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </div>
        </div>
      </form>
      {loginModal ? (
        <AlertModal
          message={"로그인 후 이용해주세요"}
          className="login-modal"
        />
      ) : (
        ""
      )}
    </Base>
  );
};

export default SignIn;

// hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../store";
import { scrollToTop } from "../lib/utils";
// about css
import styled from "styled-components";
import palette from "../styles/palette";
// common
import Input from "../components/common/Input";
import Divider from "../components/common/Divider";
import Button from "../components/common/Button";
import CheckOrFail from "../components/common/CheckOrFail";
// api
import { signUpAPI } from "../lib/api/user";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem; // 16px
  margin: 1rem; // 16px
  color: ${palette.gray[200]};
  .signup-heading {
    font-size: 2.5rem;
    font-weight: 500;
    margin: 1rem 0 0 0; // 16px
    text-align: start;
  }

  .signup-input-label {
    font-size: 1.25rem; // 20px
    margin-bottom: 0;
  }

  .signup-error-icon {
    color: ${palette.red[500]};
  }

  .signup-pass-icon {
    color: ${palette.green[500]};
  }

  .signup-input-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .signup-input-message {
    font-size: 0.875rem;
    color: ${palette.gray[500]};
    margin-bottom: 1rem; // 16px
  }

  .signup-input-error-message {
    font-size: 0.875rem;
    color: ${palette.red[500]};
    margin-bottom: 1rem; // 16px
  }

  .signup-submit-button-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 1rem; // 16px
    .btn_goBack {
      border: 1px solid ${palette.gray[200]};
      color: ${palette.gray[200]};
      &:hover {
        background-color: ${palette.gray[200]};
        color: ${palette.black};
      }
    }
    .btn_signUp {
      background: linear-gradient(to right top, #da246c, #ff9426);
      color: ${palette.gray[200]};
      :hover {
        background: linear-gradient(to right top, #b81e5c, #d97d21);
      }
    }
  }

  .signup-input-visible {
    cursor: pointer;
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
    margin: 1rem auto; // 16px
    width: 37.5rem; // 600px
  }
`;

const SignUp: React.FC = () => {
  // user ????????? ?????? state
  const [userinfo, setUserinfo] = useState({
    email: "",
    password: "",
    nickname: "",
  });
  // ????????? state
  const [validate, setValidate] = useState({
    email: "none",
    password: "none",
    nickname: "none",
  });
  // passwordType state
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: "off",
  });

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const navigate = useNavigate();

  // ????????? ???????????????
  const validateNickname = (nickname: string) => {
    const special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    const regExp = /^(?=.*[a-zA-Z0-9???-??????-??????-???]).{2,8}$/;
    if (special.test(nickname)) {
      return false;
    }
    return regExp.test(nickname);
  };

  // ????????? ???????????????
  const validateEmail = (email: string) => {
    const regExp =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regExp.test(email);
  };

  // ???????????? ??????????????? (???????????? ??????)
  const validatePassword = (password: string) => {
    const regExp = /^(?=.*[0-9a-zA-Z][$@!%*#?&]).{8,20}$/;
    return regExp.test(password);
  };

  // input value?????? ?????? ????????? ???????????? ??????
  const handleInputValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (key === "email") {
        if (value === "") {
          setValidate({ ...validate, [key]: "none" });
        } else if (validateEmail(value)) {
          setValidate({ ...validate, [key]: "pass" });
        } else {
          setValidate({ ...validate, [key]: "fail" });
        }
      } else if (key === "nickname") {
        if (value === "") {
          setValidate({ ...validate, [key]: "none" });
        } else if (validateNickname(value)) {
          setValidate({ ...validate, [key]: "pass" });
        } else {
          setValidate({ ...validate, [key]: "fail" });
        }
      } else if (key === "password") {
        if (value === "") {
          setValidate({ ...validate, [key]: "none" });
          // input?????? ?????? ??? password ?????? ???????????? ??????
          setPasswordType({ type: "password", visible: "off" });
        } else if (validatePassword(value)) {
          setValidate({ ...validate, [key]: "pass" });
        } else {
          setValidate({ ...validate, [key]: "fail" });
        }
      }
      setUserinfo({ ...userinfo, [key]: value });
    };
  // password type??? ???????????? ??????
  const onVisible = () => {
    setPasswordType(() => {
      if (passwordType.visible == "off") {
        return { type: "text", visible: "on" };
      } else {
        return { type: "password", visible: "off" };
      }
    });
  };
  // ???????????? ????????? ?????? ??????
  const onClickSubmitButton = async () => {
    const { email, password, nickname } = userinfo;
    if (!validateNickname(nickname)) {
      alert("????????? ????????? ???????????? ??????????????????!");
      return;
    }
    if (!validateEmail(email)) {
      alert("????????? ????????? ???????????? ??????????????????!");
      return;
    }
    if (!validatePassword(password)) {
      alert("????????? ???????????? ???????????? ??????????????????!");
      return;
    }

    const regForm = {
      username: email,
      password: password,
      nickname: nickname,
    };

    try {
      fetch("http://localhost:3001/user/register", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ regForm }),
      }).then((res) => {
        if (res.status >= 200 && res.status <= 204) {
          alert("???????????? ??????!! 10TUT ?????? ?????? !!");
          navigate("/signin");
        } else if (res.status == 400) {
          res.json().then((msg) => alert(msg.message));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  // ???????????? ???????????????
  useEffect(() => {
    isLoggedIn && navigate("/", { replace: true });
  });

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Base>
      <h1 className="signup-heading">Join Klayenglish</h1>
      <span>it's fast and easy.</span>
      <Divider />
      <p className="signup-input-label">Nickname</p>
      <div className="signup-input-wrapper">
        <Input
          type="text"
          placeholder=""
          onChange={handleInputValue("nickname")}
          validated={validate.nickname === "fail" ? false : true}
          width="100%"
        />
        <div>
          <CheckOrFail validate={validate.nickname} />
        </div>
      </div>
      {validate.nickname === "pass" ? (
        <p
          className="signup-input-message"
          style={{ color: palette.green[500] }}
        >
          ?????? ??????????????????!
        </p>
      ) : (
        <p
          className={
            validate.nickname === "none"
              ? "signup-input-message"
              : "signup-input-error-message"
          }
        >
          ???????????? 2~8???, ???????????? ???????????? ?????????.
        </p>
      )}
      <p className="signup-input-label">Email address</p>
      <div className="signup-input-wrapper">
        <Input
          type="text"
          onChange={handleInputValue("email")}
          validated={validate.email === "fail" ? false : true}
          width="100%"
        />
        <div>
          <CheckOrFail validate={validate.email} />
        </div>
      </div>
      {validate.email === "pass" ? (
        <p
          className="signup-input-message"
          style={{ color: palette.green[500] }}
        >
          ?????? ????????? ??????????????????.
        </p>
      ) : (
        <p
          className={
            validate.email === "none"
              ? "signup-input-message"
              : "signup-input-error-message"
          }
        >
          {validate.email === "none"
            ? "????????? ????????? ??????????????? ???????????? ?????? ?????? ???????????????."
            : "????????? ????????? ????????? ??????????????????."}
        </p>
      )}
      <p className="signup-input-label">Password</p>
      <div className="signup-input-wrapper">
        <Input
          type={passwordType.type}
          onChange={handleInputValue("password")}
          validated={validate.password === "fail" ? false : true}
          width="100%"
        />
        <div className="signup-input-visible" onClick={onVisible}>
          <CheckOrFail
            validate={validate.password}
            eyes={passwordType.visible}
          />
        </div>
      </div>
      {validate.password === "pass" ? (
        <p
          className="signup-input-message"
          style={{ color: palette.green[500] }}
        >
          ?????? ????????? ?????????????????????.
        </p>
      ) : (
        <p
          className={
            validate.password === "none"
              ? "signup-input-message"
              : "signup-input-error-message"
          }
        >
          ??????????????? 8~20??? ????????????, ?????? ????????? ??????????????? ???????????? ?????????.
        </p>
      )}

      <div className="signup-submit-button-wrapper">
        <Button className="btn_goBack" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button className="btn_signUp" onClick={onClickSubmitButton}>
          Next
        </Button>
      </div>
    </Base>
  );
};

export default SignUp;

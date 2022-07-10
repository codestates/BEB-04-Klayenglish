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
      background-color: ${palette.gray[500]};
      color: ${palette.gray[200]};
      &:hover {
        background-color: ${palette.gray[600]};
      }
    }
    .btn_signUp {
      background-color: ${palette.gray[500]};
      color: ${palette.gray[200]};
      &:hover {
        background-color: ${palette.gray[600]};
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
  // user 정보를 담은 state
  const [userinfo, setUserinfo] = useState({
    email: "",
    password: "",
    nickname: "",
  });
  // 정규식 state
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

  // 닉네임 정규표현식
  const validateNickname = (nickname: string) => {
    const special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    const regExp = /^(?=.*[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]).{2,8}$/;
    if (special.test(nickname)) {
      return false;
    }
    return regExp.test(nickname);
  };

  // 이메일 정규표현식
  const validateEmail = (email: string) => {
    const regExp =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regExp.test(email);
  };

  // 패스워드 정규표현식 (특수문자 포함)
  const validatePassword = (password: string) => {
    const regExp = /^(?=.*[0-9a-zA-Z][$@!%*#?&]).{8,20}$/;
    return regExp.test(password);
  };

  // input value값에 따른 결과를 반영하는 함수
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
          // input값이 없을 때 password 기본 타입으로 변경
          setPasswordType({ type: "password", visible: "off" });
        } else if (validatePassword(value)) {
          setValidate({ ...validate, [key]: "pass" });
        } else {
          setValidate({ ...validate, [key]: "fail" });
        }
      }
      setUserinfo({ ...userinfo, [key]: value });
    };
  // password type을 변경하는 함수
  const onVisible = () => {
    setPasswordType(() => {
      if (passwordType.visible == "off") {
        return { type: "text", visible: "on" };
      } else {
        return { type: "password", visible: "off" };
      }
    });
  };
  // 가입하기 클릭시 발생 함수
  const onClickSubmitButton = async () => {
    const { email, password, nickname } = userinfo;
    if (!validateNickname(nickname)) {
      alert("pls check your nickname");
      return;
    }
    if (!validateEmail(email)) {
      alert("pls check your email");
      return;
    }
    if (!validatePassword(password)) {
      alert("pls check your password");
      return;
    }

    const body = {
      username: email,
      password: password,
      nickname: nickname,
    };
    try {
      await navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  /*   useEffect(() => {
    isLoggedIn && navigate("/", { replace: true });
  }); */

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Base>
      <h1 className="signup-heading">회원가입</h1>
      <span>빠르고 쉽습니다.</span>
      <Divider />
      <p className="signup-input-label">닉네임</p>
      <div className="signup-input-wrapper">
        <Input
          type="text"
          placeholder="닉네임을 입력해주세요"
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
          멋진 닉네임이네요!
        </p>
      ) : (
        <p
          className={
            validate.nickname === "none"
              ? "signup-input-message"
              : "signup-input-error-message"
          }
        >
          닉네임은 2~8자, 특수문자 사용불가 입니다.
        </p>
      )}
      <p className="signup-input-label">이메일 주소</p>
      <div className="signup-input-wrapper">
        <Input
          type="text"
          placeholder="이메일을 입력해주세요"
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
          사용 가능한 이메일입니다.
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
            ? "이메일 주소는 로그인이나 비밀번호 변경 등에 사용됩니다."
            : "올바른 이메일 주소를 입력해주세요."}
        </p>
      )}
      <p className="signup-input-label">비밀번호</p>
      <div className="signup-input-wrapper">
        <Input
          type={passwordType.type}
          placeholder="비밀번호를 입력해주세요"
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
          사용 가능한 비밀번호입니다.
        </p>
      ) : (
        <p
          className={
            validate.password === "none"
              ? "signup-input-message"
              : "signup-input-error-message"
          }
        >
          비밀번호는 8~20자 이내이고, 하나 이상의 특수문자를 포함해야 합니다.
        </p>
      )}

      <div className="signup-submit-button-wrapper">
        <Button className="btn_goBack" onClick={() => navigate(-1)}>
          돌아가기
        </Button>
        <Button className="btn_signUp" onClick={onClickSubmitButton}>
          가입하기
        </Button>
      </div>
    </Base>
  );
};

export default SignUp;

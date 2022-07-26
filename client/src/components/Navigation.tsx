import React from "react";
import {
  Navbar,
  Container,
  Form,
  Nav,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../styles/palette";
import Button from "./common/Button";
import { useSelector, useDispatch } from "../store";
import { userActions } from "../store/userSlice";
const Base = styled.div`
  border-bottom: 1px solid ${palette.gray[400]};
  .navcolor {
    background-color: #1f2937;
  }
  .Nav-title {
    color: ${palette.gray[300]};
  }
  .Nav-item {
    color: ${palette.gray[300]};
    margin-left: 1rem; //16px
    transition: all 0.5s;
    &:hover {
      color: ${palette.gray[100]};
    }
  }
  img {
    max-width: 2rem; //32px
    margin-right: 0.5rem; //8px
    margin-left: 0.5rem;
  }
  .d-flex {
    margin-right: 1rem;
  }
  .Nav-signIn {
    background: linear-gradient(to right top, #da246c, #ff9426);
    color: ${palette.gray[100]};
    &:hover {
      background: linear-gradient(to right top, #b81e5c, #d97d21);
    }
    :active {
      transform: scale(0.9);
    }
  }
`;
// 스타일컴포넌트 넣기

const Navigation: React.FC = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const onSignOutBtn = () => {
    dispatch(userActions.setLoggedOut());
    localStorage.removeItem("accessToken");
  };
  return (
    <Base>
      <Navbar variant="dark" expand="lg" className="navcolor">
        {/* dark로 설정 */}
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img src={`${process.env.PUBLIC_URL}/Klay.png`} />
              <span className="Nav-title">Klayenglish</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to="/choseTest" className="Nav-item">
                Test
              </Link>
              <Link to="/Comunity" className="Nav-item">
                Community
              </Link>
              {/* 리액트라우터 Link 사용 ! */}
              <Link to="/Course" className="Nav-item">
                Course
              </Link>
            </Nav>
            <Form className="d-flex">
              <Link to="/Wallet" className="Nav-item">
                <Button className="Nav-signIn">Wallet</Button>
              </Link>
            </Form>

            <Form className="d-flex">
              {isLoggedIn ? (
                <div className="Nav-item">
                  <Button className="Nav-signIn" onClick={onSignOutBtn}>
                    Sign out
                  </Button>
                </div>
              ) : (
                <Link to="/signin" className="Nav-item">
                  <Button className="Nav-signIn">Sign in</Button>
                </Link>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Base>
  );
};

export default Navigation;

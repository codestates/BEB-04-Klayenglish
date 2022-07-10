import React from "react";
import {
  Navbar,
  Container,
  Form,
  Button,
  Nav,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import palette from "../styles/palette";

const Base = styled.div`
  border-bottom: 1px solid ${palette.gray[400]};
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
`;
// 스타일컴포넌트 넣기

const Navigation: React.FC = () => {
  return (
    <Base>
      <Navbar bg="dark" variant="dark" expand="lg">
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
              <Link to="/Test" className="Nav-item">
                Test
              </Link>
              <Link to="/Comunity" className="Nav-item">
                Comunity
              </Link>
              {/* 리액트라우터 Link 사용 ! */}
              <Link to="/Course" className="Nav-item">
                Course
              </Link>
            </Nav>
            <Form className="d-flex">
              {/* 클릭 이후 아웃라인 디자인 수정 가능한지? */}
              <Link to="/signin" className="Nav-item">
                <Button variant="outline-light">Sign In</Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Base>
  );
};

export default Navigation;

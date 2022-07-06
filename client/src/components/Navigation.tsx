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
  .Nav-item {
    color: ${palette.gray[300]};
    margin-left: 1rem;
    transition: all 0.5s;
    padding: 1rem 0;
    &:hover {
      color: ${palette.gray[100]};
    }
  }
  img {
    max-width: 2rem;
    margin-right: 0.5rem;
    margin-left: 0.5rem;
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
              <img src={`${process.env.PUBLIC_URL}/klaytn-klay-logo.png`} />
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
              {/* 리액트라우터 Link 사용 ! */}
            </Nav>
            <Form className="d-flex">
              <Button variant="outline-danger">Wallet</Button>
              {/* outline-danger로 바꿈 */}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Base>
  );
};

export default Navigation;

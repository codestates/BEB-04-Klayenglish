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

const Base = styled.div`
  .Nav-item {
    color: white;
    text-decoration: none;
    margin-right: 20px;
  }
`;
// 스타일컴포넌트 넣기

const Navigation = () => {
  return (
    <Base>
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          {/* dark로 설정 */}
          <Container fluid>
            <Navbar.Brand href="#">
              <img
                width="100"
                src="data:image/jpeg;base64,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"
              ></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Link to="/" className="Nav-item">
                  Home
                </Link>
                <Link to="/Test" className="Nav-item">
                  Test
                </Link>
                {/* 리액트라우터 Link 사용 ! */}
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-danger">Search</Button>
                {/* outline-danger로 바꿈 */}
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </Base>
  );
};

export default Navigation;

import React, { useEffect, useState } from "react";
// npm i styled-components && npm i -D @types/styled-components 으로 설치해야 typescript에서 스타일컴포넌트 적용
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "../store";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Home: React.FC = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Home;

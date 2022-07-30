import styled from "styled-components";
// blog Box 설정하기위한 useState
import React, { useState } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";

const Foot = styled.div`
  background-color: #1f2023;
  color: #dddd;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.a`
  cursor: pointer;
  font-size: 2em;
  color: #dddd;
  font-family: "Palatino Linotype";
  font-weight: 600;
`;

const MoveGithub = styled.a`
  font-size: 2em;
  margin-right: 20px;
`;

const MoveBlog = styled.span`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 10px;
`;

const Blog = styled.a``;

const BlogBox = styled.div`
  ${Blog} {
    line-height: 1.5em;
    :hover {
      color: aliceblue;
    }
  }
  display: flex;
  // on off 설정위한 props 삽입
  visibility: ${(props) => (props.className == "on" ? "visible" : "hidden")};
  flex-direction: column;
  position: absolute;
  right: 20px;
  margin-bottom: 160px;
  padding: 20px;
  border: 1px solid #ffff;
`;

const Footer: React.FC = () => {
  const [pageOn, setPageOn] = useState(false);
  const onMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPageOn(true);
  };
  const onMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPageOn(false);
  };

  return (
    <Foot>
      <div>
        <Title>4rontsea</Title>
        <div>Copyright © 2022 . All rights reserved.</div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <MoveGithub
          target="_blank"
          href="https://github.com/codestates/beb-04-first-04"
        >
          <GitHubIcon />
        </MoveGithub>
        <MoveBlog onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <LanguageIcon style={{ fontSize: "2em" }} />
          <BlogBox className={pageOn ? "on" : "off"}>
            <Blog target="_blank" href="https://minwoogramer.tistory.com/">
              https://minwoogramer.tistory.com/
            </Blog>
            <Blog target="_blank" href="https://hellocrypto.hashnode.dev/">
              https://hellocrypto.hashnode.dev/
            </Blog>
            <Blog target="_blank" href="https://velog.io/@ge5rg2">
              https://velog.io/@ge5rg2
            </Blog>
            <Blog target="_blank" href="https://velog.io/@genius_jihyepark">
              https://velog.io/@genius_jihyepark
            </Blog>
          </BlogBox>
        </MoveBlog>
      </div>
    </Foot>
  );
};

export default Footer;

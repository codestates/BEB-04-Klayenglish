import React from "react";
import Card from "react-bootstrap/Card";
import styled from "styled-components";
import palette from "../styles/palette";
import { useState } from "react";
// import TimeCounting from "time-counting";
const Base = styled.div`
  /* border-bottom: 2px solid ${palette.gray[400]};
  .navcolor {
    background-color: #1f2937;
  } */
  .posts {
    color: black;
  }
  .like {
    float: right;
    margin-right: 0.5rem;
    cursor: pointer;
  }
`;
const Post = () => {
  const [like, setLike] = useState(false);
  return (
    <Base>
      <div>
        <div className="posts">
          <Card>
            <Card.Header>Event</Card.Header>
            <Card.Body>
              <Card.Img
              //   variant="top"
              //   src="data:image/jpeg;base64,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"
              />
              <blockquote className="blockquote mb-0">
                <p> 👍 TuT 지급 이벤트</p>
                <footer className="blockquote-footer">
                  <cite title="Source Title">admin</cite>
                </footer>
              </blockquote>
            </Card.Body>
            <div>
              <span
                className="like"
                onClick={() => {
                  console.log("click");
                  setLike(!like);
                }}
              >
                {like ? "👍" : "🖤"}
              </span>
            </div>
          </Card>
        </div>
        <br />
        <div className="posts">
          <Card>
            <Card.Header>Event</Card.Header>
            <Card.Body>
              <Card.Img
              //   variant="top"
              //   src="data:image/jpeg;base64,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"
              />
              <blockquote className="blockquote mb-0">
                <p> 🤍 게시판 테마 추가</p>
                <footer className="blockquote-footer">
                  <cite title="Source Title">admin</cite>
                </footer>
              </blockquote>
            </Card.Body>
            <div>
              <span
                className="like"
                onClick={() => {
                  console.log("click");
                  setLike(!like);
                }}
              >
                {like ? "👍" : "🖤"}
              </span>
            </div>
          </Card>
        </div>
        <br />
        <div className="posts">
          <Card>
            <Card.Header>Event</Card.Header>
            <Card.Body>
              <Card.Img
              //   variant="top"
              //   src="data:image/jpeg;base64,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"
              />
              <blockquote className="blockquote mb-0">
                <p> 🚀 강좌 추가 업데이트</p>
                <footer className="blockquote-footer">
                  <cite title="Source Title">admin</cite>
                </footer>
              </blockquote>
            </Card.Body>
            <div>
              <span
                className="like"
                onClick={() => {
                  console.log("click");
                  setLike(!like);
                }}
              >
                {like ? "👍" : "🖤"}
              </span>
            </div>
          </Card>
        </div>
        <br />
      </div>
    </Base>
  );
};

export default Post;

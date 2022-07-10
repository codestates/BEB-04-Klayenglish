import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import { useEffect } from "react";
import WordsCard from "../components/WordsCard";
import { Card, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MovieSlice from "../store/movieSlice";
import BoardList from "../components/BoardList";
// import MovieSliede from "../components/MovieSlide";

// type GreetingsProps = {
//   item: void;
//   slip: any;
// };

const Movies: React.FC = () => {
  const Base = styled.div`
    background-color: ${palette.gray[700]};
    height: 100vh;
    color: ${palette.gray[200]};
    display: flex;

    .Textarea {
      border: 2px solid rgb(213, 194, 194);
    }
  `;

  //   1. 무비슬라이드 만들기
  //   2. 댓글창 만들기
  // const [words, setWords] = useState([]);
  // const getWords = async () => {
  //   let url = `https://api.adviceslip.com/advice`;
  //   let response = await fetch(url);
  //   let data = await response.json();
  //   setWords(data);
  //   console.log(words);
  // };
  // useEffect(() => {
  //   getWords();
  // }, []);
  // const Movies = useSelector
  // const dispatch = useDispatch();
  // const { popularMovies, topRatedMovies, upcomingMovies } = useSelector(
  //   (state: any) => state.movie
  // );

  const [word, setWord] = useState(null);
  const getWords = async () => {
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      setWord(response.data.slip.advice);
      console.log("명언데이터확인");
      console.log("word", word);
    } catch (e) {
      console.log(e);
    }
  };
  // async사용 + data UI예 보여주기

  useEffect(() => {
    getWords();
    // dispatch(movieActions.getMovies());
  }, []);

  return (
    <Base>
      <div>
        <h1>Comunity</h1>
        <br />
        <h1>$ 영화슬라이드 작업중...</h1>
        {/* <MovieSliede /> */}
        {/* <MovieSlide movies={popularMovies}/> */}
        {/* 컴포넌트작업중 */}
        <div>
          <h2>Life quotes</h2>
          {/* onClick={onClick}설정??  */}
        </div>
        {word && (
          <textarea
            className="Textarea"
            // rows={5}
            placeholder={JSON.stringify(word, null, 2)}
            readOnly={true}
          />
        )}
        <div>
          <h1>게시판 & 이벤트</h1>
          <BoardList />
          {/* 게시판 목록보기 */}
        </div>
        <Container>
          <Row>
            {/* {data.map((slip) => (
              <Col lg={3}>
                {" "}
                <WordsCard item={slip} />
              </Col>
            ))} */}

            <Col lg={3}>
              {" "}
              <WordsCard />
            </Col>
            <Col lg={3}>
              {" "}
              <WordsCard />
            </Col>
            <Col lg={3}>
              {" "}
              <WordsCard />
            </Col>
            <Col lg={3}>
              {" "}
              <WordsCard />
            </Col>
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default Movies;

// const dispatch = useDispatch();

// // const { popularMovies, topRatedMovies, upcomingMovies } = useSelector(
// //   (state) => state.movie
// // );

// useEffect(() => {
//   dispatch(movieAction.getMovies());
// });
// //useEffect는 렌더를 하고 호출되므로 충돌이 있음 => 나중에 불러줘야함!
// return (
//   <div>
//     <h1>Home</h1>
//     {/* {popularMovies.result && <Banner movie={popularMovies.results[0]} />}
//     조건부렌더링 */}
//   </div>
// );

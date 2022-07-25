import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import palette from "../styles/palette";
import { useEffect } from "react";
import WordsCard from "../components/WordsCard";
import { Card, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../store/movieAction";
import { AppDispatch } from "../store";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import MovieCard from "../components/MovieCard";

const Movies: React.FC = () => {
  const Base = styled.div`
    background-color: ${palette.gray[700]};
    height: 100vh;
    color: ${palette.gray[200]};
  `;

  // useEffect(() => {
  //   getWords();
  // }, []);

  const { popularMovies } = useSelector((state: any) => state.movie);
  const dispatch: AppDispatch = useDispatch();
  // console.log("home", popularMovies);

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);
  // api호출에러;

  // const [word, setWord] = useState(null);
  // const getWords = async () => {
  //   try {
  //     const response = await axios.get("https://api.adviceslip.com/advice");
  //     setWord(response.data.slip.advice);
  //     console.log("word", word);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <Base>
      <div>
        {/* 모징? */}
        {/* {popularMovies.results && (
          <Banner movie={popularMovies.data.results[0]} />
        )} */}
        <br />
        <h1>English Movie</h1>
        <MovieSlide movie={popularMovies} />
        {/* <div>
          <h2>Life quotes</h2>
          {word && (
            <textarea
              rows={7}
              value={JSON.stringify(word, null, 2)}
              readOnly={true}
            />
          )}
        </div> */}
        <Container>
          <Row>
            {/* {data.map((slip) => (
              <Col lg={3}>
                {" "}
                <WordsCard item={slip} />
              </Col>
            ))} */}
            <h1>게시판 & 이벤트</h1>
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

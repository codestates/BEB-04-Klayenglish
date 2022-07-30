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
import PostCard from "../components/PostCard";

const Movies: React.FC = () => {
  const Base = styled.div`
    background-color: ${palette.black};
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
        <Banner />
        <br />
        <h1>English Recommand</h1>
        <MovieSlide />
        <Container>
          <Row>
            <h1>Notice & Event</h1>
            <PostCard />
          </Row>
        </Container>
      </div>
    </Base>
  );
};

export default Movies;

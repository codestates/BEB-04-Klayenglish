import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Movies from "../pages/Comunity";
import MovieCard from "./MovieCard";
// import { MovieCard } from "./MovieCard";

interface movieProps {
  movie: {
    popularMovies: {
      data: {
        page: string;
        results: [
          {
            adult: any;
            backdrop_path: any;
            genre_ids: [any, any, any, any, any];
            id: any;
            original_language: any;
            original_title: any;
            overview: any;
            popularity: any;
            poster_path: any;
            release_date: any;
            title: any;
            video: any;
            vote_average: any;
            vote_count: any;
            [propName: string]: any;
          }
        ];
      };
    };
  };
}

interface itemProps {
  results: {
    adult?: any;
    backdrop_path?: any;
    genre_ids?: [any, any, any, any, any];
    id?: any;
    original_language?: any;
    original_title?: any;
    overview?: any;
    popularity?: any;
    poster_path?: any;
    release_date?: any;
    title?: any;
    video?: any;
    vote_average?: any;
    vote_count?: any;
    // [propName: string]: any;
  };
}
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const MovieSlide: React.FC<movieProps> = ({ movie }) => {
  console.log("movie", movie);
  return (
    <div>
      <Carousel responsive={responsive}>
        {/* {movie.popularMovies.data.results.map((item: any) => (
          <MovieCard item={item} />
        ))} */}
        {/* movie.results */}
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </Carousel>
    </div>
  );
};

export default MovieSlide;

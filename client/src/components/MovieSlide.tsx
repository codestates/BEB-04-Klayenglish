import React from "react"; /* 
import Carousel from "react-multi-carousel"; */
import "react-multi-carousel/lib/styles.css";
import Movies from "../pages/Comunity";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import First from "./Moviecard/First";
import Second from "./Moviecard/Second";
import Three from "./Moviecard/Three";
import Four from "./Moviecard/Four";
import Five from "./Moviecard/Five";
import Six from "./Moviecard/Six";
// import { MovieCard } from "./MovieCard";

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

const MovieSlide: React.FC = () => {
  // console.log("여기냐", movie);
  return (
    <div>
      <Carousel responsive={responsive}>
        {/* {movie.map((item) => (
          <MovieCard item={item} />
        ))} */}
        <div>
          <First />
        </div>
        <div>
          <Second />
        </div>
        <div>
          <Three />
        </div>
        <div>
          <Four />
        </div>
        <div>
          <Five />
        </div>
        <div>
          <Six />
        </div>
        <div>
          <Three />
        </div>
        <div>
          <Four />
        </div>
        <div>
          <First />
        </div>
      </Carousel>
    </div>
  );
};

export default MovieSlide;

import React from "react";
import styled from "styled-components";

type movieProps = {
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
          }
        ];
      };
    };
  };
};

const Base = styled.div`
  .banner {
    height: 300px;
    display: flex;
    /* align-items: center; */
  }
  .banner-info {
    width: 40%;
    margin-left: 30px;
    z-index: 1;
  }
  .banner::before {
    position: absolute;
    right: 0;
    width: 100%;
    height: 300px;
    content: "";
    background: linear-gradient(to right, black, transparent);
  }
`;

const Banner: React.FC<movieProps> = ({ movie }) => {
  console.log(movie, "movie");
  return (
    <Base>
      <div
        className="banner"
        style={{
          backgroundImage:
            "url(" +
            `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${movie.popularMovies.data.results[0].poster_path}` +
            ")",
        }}
      >
        {/* jsx 문법상 string으로 해결 */}
        <div className="banner-info">
          <h1>{movie.popularMovies.data.results[0].title}</h1>
          <p>{movie.popularMovies.data.results[0].overview}</p>
        </div>
      </div>
    </Base>
  );
};

export default Banner;

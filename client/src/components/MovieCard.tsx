import { url } from "inspector";
import React from "react";
import styled from "styled-components";

const Base = styled.div`
  .card {
    width: 300px;
    height: 200px;
  }
`;

const MovieCard: React.FC = () => {
  return (
    <Base>
      <div
        className="card"
        style={{
          backgroundImage:
            "url('	https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/lcTuggU70y6pt6x13Rv1Ffjs93K.jpg')",
        }}
      ></div>
    </Base>
  );
};

export default MovieCard;
//  <div
//     className="card"
//     style={{
//       backgroundImage:
//         "url(" +
//         `https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/{item.poster_path}` +
//         ")",
//     }}
//   ></div>

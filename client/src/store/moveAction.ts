import api from "../api";
// axios를 활용한 api를 써보자!
import { movieActions } from "./movieSlice";

// type getMovies = {
//   popularMovieApi: any;
//   topRatedApi: any;
//   upComingApi: any;
// };

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
  return async (dispatch) => {
    const popularMovieApi = await api.get(
      `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    const topRatedApi = await api.get(
      `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    const upComingApi = await api.get(
      `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
    // [popularMovies, topRatedMovies, upcomingMovies]
    let [popularMovieApi, topRatedApi, upComingApi]: any = await Promise.all([
      popularMovieApi,
      topRatedApi,
      upComingApi,
    ]);
    console.log("popularMovieApi", popularMovieApi);

    dispatch(movieActions.getPopularMovies({ data: Object }));
    // type: "GET_MOVIES_SUCCESS",
    // payload: {
    //   popularMovies: popularMovies.data,
    //   topRatedMovies: topRatedMovies.data,
    //   upcomingMovies: upcomingMovies.data,
  };
}

export const movieAction = { getMovies };

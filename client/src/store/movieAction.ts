import { AppDispatch } from ".";
import api from "../api";
// axios를 활용한 api를 써보자!
import { movieActions } from "./movieSlice";

// interface popularMovieProps:{
//     popularMovieApi:any
// }
// type getMoviesProps = {
//   popularMovieApi: any;
//   topRatedApi: any;
//   upComingApi: any;
// };

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
  return async (dispatch: AppDispatch) => {
    const popularMovieApi = await api.get(
      `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    let data = await popularMovieApi;
    dispatch(movieActions.getPopularMovies({ data }));
    // dispatch(movieActions.getPopularMovies({ data: Object }));
    // api에서 url 받아온후 dispatch로 진행

    //     const topRatedApi = await api.get(
    //       `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    //     );
    //     const upComingApi = await api.get(
    //       `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    //     );
    // // api일단 생략

    // [popularMovies, topRatedMovies, upcomingMovies]
    // let [popularMovieApi, topRatedApi, upComingApi]: any = await Promise.all([
    //   popularMovieApi,
    //   topRatedApi,
    //   upComingApi,
    // ]);

    // let popularMovies = await new Promise(popularMovieApi);

    // type: "GET_MOVIES_SUCCESS",
    // payload: {
    //   popularMovies: popularMovies.data,
    //   topRatedMovies: topRatedMovies.data,
    //   upcomingMovies: upcomingMovies.data,
    // dispatch({
    //   type: "GET_MOVIES_SUCCESS",
    //   payload: {
    //     popularMovies: popularMovies.data,
    //   },
    // });
  };
}

export const movieAction = { getMovies };

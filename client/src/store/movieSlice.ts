import { createSlice } from "@reduxjs/toolkit";
//createSlice는 Reducer 만드는 것을 도와줌
//action  이름을 만드는 대신 name 이라는 키가 쓰임
//리덕스에 썻던 switch 써서 만든 케이스들을 다함수로 만듬

type movieSlieState = {
  popularMovies: any;
  //   topRatedMovies: any;
  //   upcomingMovies: any;
};
// 타입설정

let initialState: movieSlieState = {
  popularMovies: {},
  //   topRatedMovies: {},
  //   upcomingMovies: {},
};
//초기설정

export const moviesSlice = createSlice({
  name: "Movies",
  initialState,
  reducers: {
    getPopularMovies(state, action) {
      state.popularMovies = action.payload.data;
    },
    // getRatedMovies(state, action) {
    //   state.popularMovies = action.payload.data;
    // },
    // getUpcomingMovies(state, action) {
    //   state.popularMovies = action.payload.data;
    // },
    // payload 데이터줘야함
  },
});

export const movieActions = moviesSlice.actions;
export default moviesSlice.reducer;

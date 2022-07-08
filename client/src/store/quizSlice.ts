import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type quizState = {
  page: number;
  pass: true | false | "init";
};

const initialState: quizState = {
  page: 0,
  pass: "init",
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    passQuiz(state) {
      state.page++;
      state.pass = true;
    },
    failQuiz(state) {
      state.page++;
      state.pass = false;
    },
    backQuiz(state) {
      state.page--;
    },
    setPageNum(
      state,
      actions: PayloadAction<{
        page: number;
        pass: true | false | "init";
      }>
    ) {
      state.page = actions.payload.page;
      state.pass = actions.payload.pass;
    },
  },
});

export const quizActions = { ...quizSlice.actions };

export default quizSlice;

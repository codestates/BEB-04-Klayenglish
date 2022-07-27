import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type quizState = {
  page: number;
  pass: boolean;
  word: string;
  answer: string;
};

const initialState: quizState[] = [];

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    resultData: (
      state = initialState,
      action: PayloadAction<{
        page: number;
        pass: boolean;
        word: string;
        answer: string;
      }>
    ) => {
      state.push(action.payload);
    },
    resetResultData: (state) => {
      state.splice(0);
    },
  },
});

export const resultActions = { ...resultSlice.actions };

export default resultSlice;

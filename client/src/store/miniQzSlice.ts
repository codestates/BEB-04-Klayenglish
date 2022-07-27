import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type miniQzState = {
  answer: string;
  correct: string;
  lec_id: number;
  question: string;
  qz_category: string;
  qz_id: number;
  qz_num: number;
};

const initialState: miniQzState[] = [];

export const miniQzSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    miniQzData: (
      state = initialState,
      action: PayloadAction<{
        answer: string;
        correct: string;
        lec_id: number;
        question: string;
        qz_category: string;
        qz_id: number;
        qz_num: number;
      }>
    ) => {
      state.push(action.payload);
    },
    resetQzData: (state) => {
      state.splice(0);
    },
  },
});

export const miniQzActions = { ...miniQzSlice.actions };

export default miniQzSlice;

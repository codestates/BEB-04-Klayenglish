import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type qzState = {
  answer: string;
  correct: string;
  lec_id: number;
  question: string;
  qz_category: string;
  qz_id: number;
  qz_num: number;
};

const initialState: qzState[] = [];

export const qzSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    qzData: (
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
    resetData: (state) => {
      state.splice(0);
    },
  },
});

export const { qzData } = qzSlice.actions;

export const qzActions = { ...qzSlice.actions };

export default qzSlice;

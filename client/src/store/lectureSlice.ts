import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import lectureList from "../lib/lectureList";

type lectureState = {
  id: number;
  image: string;
  level?: "master" | "diamond" | "bronze" | "gold" | "silver" | "challenger";
  name: string;
  source: string;
};

const initialState: lectureState[] = [];

export const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    lecData: (
      state,
      action: PayloadAction<{
        id: number;
        image: string;
        level?:
          | "master"
          | "diamond"
          | "bronze"
          | "gold"
          | "silver"
          | "challenger";
        name: string;
        source: string;
      }>
    ) => {
      state.push(action.payload);
    },
  },
});

export const { lecData } = lectureSlice.actions;

export const lectureActions = { ...lectureSlice.actions };

export default lectureSlice;

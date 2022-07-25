import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import lectureList from "../lib/lectureList";

type lectureState = {
  id: number;
  image: string;
  level: string;
  name: string;
  source: string;
};

const initialState: lectureState = {
  id: 0,
  image: "",
  level: "",
  name: "",
  source: "",
};

export const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    setLecture(
      state,
      actions: PayloadAction<{
        id: number;
        image: string;
        level: string;
        name: string;
        source: string;
      }>
    ) {
      state.id = actions.payload.id;
      state.image = actions.payload.image;
      state.level = actions.payload.level;
      state.name = actions.payload.name;
      state.source = actions.payload.source;
    },
  },
});

export const lectureActions = { ...lectureSlice.actions };

export default lectureSlice;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type passState = {
  lecId: number;
  passed: string;
};

const initialState: passState[] = [];

export const passSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {
    setPassData: (
      state,
      action: PayloadAction<{
        lecId: number;
        passed: string;
      }>
    ) => {
      state.push(action.payload);
    },
  },
});

export const { setPassData } = passSlice.actions;

export const passActions = { ...passSlice.actions };

export default passSlice;

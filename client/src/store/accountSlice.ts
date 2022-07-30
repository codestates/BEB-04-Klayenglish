import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface accountState {
  account: string;
}

const initialState: accountState = {
  account: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount(
      state,
      action: PayloadAction<{
        account: string;
      }>
    ) {
      state.account = action.payload.account;
    },
  },
});

export const accountActions = { ...accountSlice.actions };

export default accountSlice;

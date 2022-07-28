import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useTypedDispatch,
  useSelector as useTypedSelector,
} from "react-redux";
import quizSlice from "./quizSlice";
import userSlice from "./userSlice";
import movieSlice from "./movieSlice";
import modalSlice from "./modalSlice";
import lectureSlice from "./lectureSlice";
import qzSlice from "./qzSlice";
import resultSlice from "./resultSlice";
import miniQzSlice from "./miniQzSlice";
import accountSlice from "./accountSlice";

//useSelector, useDispatch 등을 react-redux에서 가져온 후 state에 저장해서 사용할 수 있게 index.ts로 저장
export const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer,
    user: userSlice.reducer,
    lecture: lectureSlice.reducer,
    movie: movieSlice,
    modal: modalSlice.reducer,
    qz: qzSlice.reducer,
    result: resultSlice.reducer,
    miniQz: miniQzSlice.reducer,
    account: accountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useTypedDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useTypedSelector;

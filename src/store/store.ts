import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./reducers/PostSlice";

const rootReducer = combineReducers({
  postsReducer,
});

export const initStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof initStore>;
export type AppDispatch = AppStore["dispatch"];

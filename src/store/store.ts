import { configureStore, combineReducers } from "@reduxjs/toolkit";
import postsReducer from "./reducers/PostSlice";
import commentsReducer from "./reducers/CommentSlice"

const rootReducer = combineReducers({
  postsReducer,
  commentsReducer
});

export const initStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof initStore>;
export type AppDispatch = AppStore["dispatch"];

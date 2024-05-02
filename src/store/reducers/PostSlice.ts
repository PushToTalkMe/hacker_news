import { createSlice } from "@reduxjs/toolkit";
import { IPost } from "../../interfaces/IPost";
import { fetchPosts } from "./ActionCreator";

interface PostsState {
  posts: IPost[];
  newPostsId: number[];
  isLoading: boolean;
  error: string;
}

const initialState: PostsState = {
  posts: [],
  newPostsId: [],
  isLoading: false,
  error: "",
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.newPostsId = action.payload.newPostsId;
        state.posts = action.payload.posts;
        state.isLoading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.type;
      });
  },
});

export default postsSlice.reducer;

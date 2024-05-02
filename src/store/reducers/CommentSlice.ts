import { createSlice } from "@reduxjs/toolkit";
import { IComment } from "../../interfaces/IComment";
import { fetchComments, fetchCommentsKids } from "./ActionCreator";

interface CommentsState {
  comments: IComment[];
  comments_isLoading: boolean;
  comments_error: string;
  commentsKids: IComment[];
  comments_kids_isLoading: boolean;
  comments_kids_error: string;
}

const initialState: CommentsState = {
  comments: [],
  comments_isLoading: false,
  comments_error: "",
  commentsKids: [],
  comments_kids_isLoading: false,
  comments_kids_error: "",
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.comments_isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        if (
          state.comments.find((comment) =>
            action.payload.comments.find(
              (fetchComment) => comment.id === fetchComment.id
            )
          )
        ) {
          state.comments = [...state.comments];
        } else {
          state.comments = [...state.comments, ...action.payload.comments];
        }
        state.comments_isLoading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.comments_isLoading = false;
        state.comments_error = action.type;
      })
      .addCase(fetchCommentsKids.pending, (state) => {
        state.comments_kids_isLoading = true;
      })
      .addCase(fetchCommentsKids.fulfilled, (state, action) => {
        if (
          state.commentsKids.find((commentsKid) =>
            action.payload.commentsKids.find(
              (fetchCommentsKids) => commentsKid.id === fetchCommentsKids.id
            )
          )
        ) {
          state.commentsKids = [...state.commentsKids];
        } else {
          state.commentsKids = [
            ...state.commentsKids,
            ...action.payload.commentsKids,
          ];
        }
        state.comments_kids_isLoading = false;
      })
      .addCase(fetchCommentsKids.rejected, (state, action) => {
        state.comments_kids_isLoading = false;
        state.comments_kids_error = action.type;
      });
  },
});

export default commentsSlice.reducer;

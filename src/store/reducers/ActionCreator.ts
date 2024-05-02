import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPost } from "../../interfaces/IPost";
import { IComment } from "../../interfaces/IComment";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  let posts: IPost[] = [];
  const response_newPostsId = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty"
  );
  const newPostsId: number[] = await response_newPostsId.json();
  for (let i = 0; i < 100; i++) {
    const response_post = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${newPostsId[i]}.json?print=pretty`
    );
    const post = await response_post.json();
    posts.push(post);
  }
  posts = posts.sort((a, b) => b.time - a.time)
  return { newPostsId, posts };
});

export const fetchComments = createAsyncThunk("comments/fetchComments", async (id: number[]) => {
  let comments: IComment[] = [];
  for (let i = 0; i < id.length; i++) {
    const response_comments = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id[i]}.json?print=pretty`
    );
    const comment = await response_comments.json();
    comments.push(comment)
  }
  return { comments };
});

export const fetchCommentsKids = createAsyncThunk("comments/fetchCommentsKids", async (id: number[]) => {
  let commentsKids: IComment[] = [];
  for (let i = 0; i < id.length; i++) {
    const response_comments = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id[i]}.json?print=pretty`
    );
    const comment = await response_comments.json();
    commentsKids.push(comment)
  }
  return { commentsKids };
});

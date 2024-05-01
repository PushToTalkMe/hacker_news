import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPost } from "../../interfaces/IPost";

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
  return { newPostsId, posts };
});

import React, { useEffect, useState } from "react";
import { useRouteNavigator, useParams } from "@vkontakte/vk-mini-apps-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IPost } from "../../interfaces/IPost";
import { fetchPosts } from "../../store/reducers/ActionCreator";
const Post = () => {
  const routerNavigator = useRouteNavigator();
  const params = useParams();

  const dispatch = useAppDispatch();
  const { posts, error, isLoading } = useAppSelector(
    (state) => state.postsReducer
  );
  const [post, setPost] = useState<IPost>();
  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
    if (params) {
      setPost(posts.find((post) => post.id === +params.id!));
    }
  }, [posts]);
  return (
    <div>
      {isLoading && <h1>Идет загрузка...</h1>}
      {error && <h1>Произошла ошибка при загрузке</h1>}
      {post && <h1>{post.id}</h1>}
      <button onClick={() => routerNavigator.back()}>Назад</button>
    </div>
  );
};

export { Post };

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPosts } from "../../store/reducers/ActionCreator";
import { PostItem } from "../../components/PostItem/PostItem";

function Home() {
  const dispatch = useAppDispatch();
  const { posts, error, isLoading } = useAppSelector(
    (state) => state.postsReducer
  );

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
    // const refetch = setInterval(() => {
    //   dispatch(fetchPosts());
    // }, 60000);
    // return () => clearInterval(refetch);
  }, []);

  return (
    <div>
      {isLoading && <h1>Идет загрузка...</h1>}
      <button onClick={() => dispatch(fetchPosts())}>Обновить новости</button>
      {error && <h1>Произошла ошибка при загрузке</h1>}
      {posts && posts.map((post) => <PostItem post={post} key={post.id} />)}
    </div>
  );
}

export { Home };

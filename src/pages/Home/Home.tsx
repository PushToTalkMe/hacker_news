import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPosts } from "../../store/reducers/ActionCreator";
import { PostItem } from "../../components/PostItem/PostItem";
import { Button, Spinner, Div } from "@vkontakte/vkui";
import styles from "./Home.module.css";

function Home() {
  const dispatch = useAppDispatch();
  const { posts, error, isLoading } = useAppSelector(
    (state) => state.postsReducer
  );

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
    const refetch = setInterval(() => {
      dispatch(fetchPosts());
    }, 60000);
    return () => clearInterval(refetch);
  }, []);

  return (
    <Div className={styles.home}>
      {isLoading ? (
        <>
          <Spinner size="large" className={styles.spinner} />
          <h1 className={styles.h1}>Идет обновление новостей...</h1>
        </>
      ) : (
        <>
          {posts.length ? (
            <>
              <Button
                align="center"
                size="l"
                onClick={() => dispatch(fetchPosts())}
              >
                Обновить новости
              </Button>
              {posts.map((post) => (
                <PostItem post={post} key={post.id} />
              ))}
            </>
          ) : null}
        </>
      )}
      {error && (
        <h1 className={styles.h1}>Произошла ошибка при загрузке новостей</h1>
      )}
    </Div>
  );
}

export { Home };

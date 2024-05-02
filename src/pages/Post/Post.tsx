import React, { useEffect, useState } from "react";
import { useRouteNavigator, useParams } from "@vkontakte/vk-mini-apps-router";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IPost } from "../../interfaces/IPost";
import { fetchPosts } from "../../store/reducers/ActionCreator";
import { CommentsContainer } from "../../components/CommentsContainer/CommentsContainer";
import {
  Button,
  Div,
  Headline,
  Link,
  Subhead,
  Title,
  Text,
  Spinner,
} from "@vkontakte/vkui";
import { formatDate } from "../../helper/formatDate";
import styles from "./Post.module.css";

const postcb = (posts: IPost[], id: number): IPost | undefined => {
  return posts.find((post) => post.id === id);
};

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
      dispatch(fetchPosts()); // Если пользователь перезагрузит страницу с постом, то произойдет обновление постов
    }
    if (params) {
      setPost(postcb(posts, +params.id!));
    }
  }, [posts]);

  return (
    <Div className={styles.post}>
      {isLoading && (
        <>
          <Spinner size="large" className={styles.spinner} />
          <h1 className={styles.h1}>Идет загрузка новости</h1>
        </>
      )}
      {error && <h1>Произошла ошибка при загрузке поста</h1>}
      {post && (
        <div>
          <Button
            align="center"
            size="m"
            onClick={() => routerNavigator.back()}
            stretched
          >
            Назад
          </Button>
          <div className={styles.div}>
            <Title level="1" className={styles.title}>
              {post.title}
            </Title>
            <Subhead className={styles.subhead}>Автор: {post.by}</Subhead>
            <Headline>Дата публикации: {formatDate(post.time)}</Headline>
            <Text>Количество комментариев: {post.descendants}</Text>
            <Link href={post.url}>URL-адрес статьи</Link>
          </div>
          {post.descendants ? (
            <CommentsContainer kids={post.kids} />
          ) : (
            <h2 className={styles.h2}>Комментариев нет</h2>
          )}
        </div>
      )}
    </Div>
  );
};

export { Post };

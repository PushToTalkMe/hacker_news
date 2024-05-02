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
    <Div style={{ display: "flex", flexDirection: "column" }}>
      {isLoading && (
        <>
          <Spinner size="large" style={{ margin: "20px 0" }} />
          <h1 style={{ textAlign: "center" }}>Идет загрузка новости</h1>
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Title level="1" style={{ margin: "10px 0 5px 0" }}>
              {post.title}
            </Title>
            <Subhead style={{ marginBottom: "10px" }}>Автор: {post.by}</Subhead>
            <Headline>Дата публикации: {formatDate(post.time)}</Headline>
            <Text>Количество комментариев: {post.descendants}</Text>
            <Link href={post.url}>URL-адрес статьи</Link>
          </div>
          {post.descendants ? (
            <CommentsContainer kids={post.kids} />
          ) : (
            <h2 style={{ textAlign: "center" }}>Комментариев нет</h2>
          )}
        </div>
      )}
    </Div>
  );
};

export { Post };

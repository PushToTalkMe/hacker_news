import React, { FC } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { PostItemProps } from "./PostItem.props";
import { ContentCard, Button, Card } from "@vkontakte/vkui";
import { formatDate } from "../../helper/formatDate";
import styles from "./PostItem.module.css";
const PostItem: FC<PostItemProps> = ({ post }) => {
  const routerNavigator = useRouteNavigator();

  return (
    <Card mode="outline" className={styles.card}>
      <ContentCard
        subtitle={post.by}
        header={post.title}
        caption={formatDate(post.time)}
        text={`Рейтинг: ${post.score}`}
      />
      <Button
        stretched
        align="center"
        size="l"
        mode="outline"
        onClick={() => routerNavigator.push(`/post/${post.id}`)}
      >
        Подробнее
      </Button>
    </Card>
  );
};

export { PostItem };

import React, { FC } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { PostItemProps } from "./PostItem.props";

const PostItem: FC<PostItemProps> = ({ post }) => {
  const routerNavigator = useRouteNavigator();

  return (
    <div>
      {post.by}. {post.title}
      <button onClick={() => routerNavigator.push(`/post/${post.id}`)}>
        Подробнее
      </button>
    </div>
  );
};

export { PostItem };

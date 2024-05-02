import React, { FC } from "react";
import { CommentItemKidsProps } from "./CommentItemKids.props";
import { Card, ContentCard } from "@vkontakte/vkui";
import { formatDate } from "../../helper/formatDate";

const CommentItemKids: FC<CommentItemKidsProps> = ({ comment, width }) => {
  return (
    <div
      style={{
        width: width,
        margin: "auto",
      }}
    >
      {comment.deleted ? (
        <h5 style={{ textAlign: "center" }}>Вложенный комментарий удален</h5>
      ) : (
        <>
          <Card mode="outline" style={{ margin: "10px 0px 10px 0px" }}>
            <ContentCard
              subtitle={comment.by}
              caption={formatDate(comment.time)}
              text={comment.text}
            />
          </Card>
        </>
      )}
    </div>
  );
};

export { CommentItemKids };

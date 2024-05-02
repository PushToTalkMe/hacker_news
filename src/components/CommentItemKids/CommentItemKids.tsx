import React, { FC } from "react";
import { CommentItemKidsProps } from "./CommentItemKids.props";
import { Card, ContentCard } from "@vkontakte/vkui";
import { formatDate } from "../../helper/formatDate";
import styles from "./CommentItemKids.module.css";

const CommentItemKids: FC<CommentItemKidsProps> = ({ comment, width }) => {
  return (
    <div
      style={{
        width: width,
        margin: "auto",
      }}
    >
      {comment.deleted ? (
        <h5 className={styles.h5}>Вложенный комментарий удален</h5>
      ) : (
        <>
          <Card mode="outline" className={styles.card}>
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

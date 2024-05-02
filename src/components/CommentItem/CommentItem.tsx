import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { CommentItemProps } from "./CommentItem.props";
import { fetchCommentsKids } from "../../store/reducers/ActionCreator";
import { Card, ContentCard, Spinner } from "@vkontakte/vkui";
import { formatDate } from "../../helper/formatDate";
import { CommentItemKids } from "../CommentItemKids/CommentItemKids";
import styles from "./CommentItem.module.css";

const CommentItem: FC<CommentItemProps> = ({ comment, width }) => {
  const [isOtherComments, setIsOtherComments] = useState(false);
  const dispatch = useAppDispatch();
  const { commentsKids, comments_kids_isLoading } = useAppSelector(
    (state) => state.commentsReducer
  );
  return (
    <div
      className={styles.commentItem}
      style={{
        width: width,
      }}
    >
      {comment.deleted ? (
        <h3 className={styles.h3}>Комментарий удален</h3>
      ) : (
        <>
          <Card
            mode="outline"
            className={styles.card}
            onClick={() => {
              if (!isOtherComments) {
                dispatch(fetchCommentsKids(comment.kids));
              }
              setIsOtherComments(!isOtherComments);
            }}
          >
            <ContentCard
              subtitle={comment.by}
              caption={formatDate(comment.time)}
              text={comment.text}
            />
          </Card>
          {isOtherComments ? (
            comment.kids ? (
              <>
                {comments_kids_isLoading ? (
                  <>
                    <Spinner size="large" className={styles.spinner} />
                    <h2 className={styles.h2}>
                      Идет загрузка вложенных комментариев
                    </h2>
                  </>
                ) : (
                  <>
                    {commentsKids.length && (
                      <>
                        {commentsKids.map((commentsKid) => {
                          if (commentsKid.parent === comment.id) {
                            return (
                              <CommentItemKids
                                comment={commentsKid}
                                width="60vw"
                                key={commentsKid.id}
                              />
                            );
                          }
                        })}
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <h4 className={styles.h4}>Вложенных комментариев нет</h4>
            )
          ) : null}
        </>
      )}
    </div>
  );
};

export { CommentItem };

import React, { FC, useEffect } from "react";
import { CommentsContainerProps } from "./CommentsContainer.props";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Button, Div, Spinner } from "@vkontakte/vkui";
import { CommentItem } from "../CommentItem/CommentItem";
import { fetchComments } from "../../store/reducers/ActionCreator";
import styles from "./CommentsContainer.module.css";

const CommentsContainer: FC<CommentsContainerProps> = ({ kids }) => {
  const dispatch = useAppDispatch();
  const { comments, comments_isLoading } = useAppSelector(
    (state) => state.commentsReducer
  );
  useEffect(() => {
    dispatch(fetchComments(kids));
  }, []);
  return (
    <Div className={styles.commentsContainer}>
      {comments_isLoading ? (
        <>
          <Spinner size="large" className={styles.spinner} />
          <h2 className={styles.h2}>Идет загрузка комментариев</h2>
        </>
      ) : (
        <>
          <Button
            onClick={() => {
              dispatch(fetchComments(kids));
            }}
          >
            Обновить комментарии
          </Button>
          {comments.map((comment) => {
            if (kids.find((id) => comment.id === id)) {
              return (
                <CommentItem comment={comment} width="90vw" key={comment.id} />
              );
            }
          })}
        </>
      )}
    </Div>
  );
};

export { CommentsContainer };

import React, { FC, useEffect } from "react";
import { CommentsContainerProps } from "./CommentsContainer.props";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Button, Div, Spinner } from "@vkontakte/vkui";
import { CommentItem } from "../CommentItem/CommentItem";
import { fetchComments } from "../../store/reducers/ActionCreator";

const CommentsContainer: FC<CommentsContainerProps> = ({ kids }) => {
  const dispatch = useAppDispatch();
  const { comments, comments_isLoading } = useAppSelector(
    (state) => state.commentsReducer
  );
  useEffect(() => {
    dispatch(fetchComments(kids));
  }, []);
  return (
    <Div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {comments_isLoading ? (
        <>
          <Spinner size="large" style={{ margin: "20px 0" }} />
          <h2 style={{ textAlign: "center" }}>Идет загрузка комментариев</h2>
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

import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { CommentItemProps } from "./CommentItem.props";
import { fetchCommentsKids } from "../../store/reducers/ActionCreator";
import { Card, ContentCard, Spinner } from "@vkontakte/vkui";
import { formatDate } from "../../helper/formatDate";
import { CommentItemKids } from "../CommentItemKids/CommentItemKids";

const CommentItem: FC<CommentItemProps> = ({ comment, width }) => {
  const [isOtherComments, setIsOtherComments] = useState(false);
  const dispatch = useAppDispatch();
  const { commentsKids, comments_kids_isLoading } = useAppSelector(
    (state) => state.commentsReducer
  );
  return (
    <div
      style={{
        width: width,
        margin: "auto",
      }}
    >
      {comment.deleted ? (
        <h3 style={{ textAlign: "center" }}>Комментарий удален</h3>
      ) : (
        <>
          <Card
            mode="outline"
            style={{ margin: "10px 0px 10px 0px", cursor: "pointer" }}
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
                    <Spinner size="large" style={{ margin: "20px 0" }} />
                    <h2 style={{ textAlign: "center" }}>
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
              <h4 style={{ textAlign: "center" }}>
                Вложенных комментариев нет
              </h4>
            )
          ) : null}
        </>
      )}
    </div>
  );
};

export { CommentItem };

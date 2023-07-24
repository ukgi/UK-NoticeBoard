"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import WriteComment from "../write-comment/WriteComment";

export default function CommentList({ postId, parentId, author }) {
  const [commentList, setCommentList] = useState();
  const [alertLogin, setAlertLogin] = useState(false);

  useEffect(() => {
    getCommentList();
  }, [postId]);

  async function getCommentList() {
    axios
      .get("/api/show-comment", {
        params: { postId },
      })
      .then((res) => setCommentList(res.data))
      .catch(console.err);
  }

  function onFinish(values) {
    axios
      .post("/api/comment", {
        ...values,
        parent: parentId,
        author,
      })
      .then((res) => getCommentList())
      .catch((err) => {
        setAlertLogin(err.response.data);
        setTimeout(() => {
          setAlertLogin(false);
        }, 4000);
      });
  }

  return (
    <>
      <ol>
        {commentList &&
          commentList.map((comment) => {
            return <Comment key={comment._id} commentData={comment} />;
          })}
      </ol>
      {alertLogin && <h1>{alertLogin}</h1>}
      <WriteComment onFinish={onFinish} />
    </>
  );
}

"use client";

import React from "react";
import { Card, Col } from "antd";
import { Button } from "antd";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function NoticeCard({ post }) {
  const { author, description, id, title, writeDate, _id } = post;
  const session = useSession();

  function deleteHandler() {
    const result = confirm("삭제하시겠습니까?");
    if (result) {
      if (session.status === "unauthenticated") {
        return alert("로그인이 필요한 서비스입니다...로그인을 해주세요");
      }
      axios
        .delete(`/api/delete-post`, {
          data: {
            selectedPostId: _id,
            author,
          },
        }) //
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
        })
        .catch((err) => {
          console.error(err.response.data.error);
          alert(err.response.data.error);
        });
    }
  }

  return (
    <Col span={8}>
      <Link
        href={{
          pathname: `/posts/${_id}`,
        }}
      >
        <Card title={title} bordered={false} style={cardMarginStyle}>
          <p style={descriptionStyle}>{description}</p>
        </Card>
      </Link>
      <Button type='primary' danger style={buttonStyle} onClick={deleteHandler}>
        삭제
      </Button>
    </Col>
  );
}

const descriptionStyle = {
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
};
const buttonStyle = { position: "absolute", top: "25px", right: "20px" };
const cardMarginStyle = { marginTop: "12px" };

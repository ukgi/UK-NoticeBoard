"use client";

import React from "react";
import { Card, Col } from "antd";
import { Button } from "antd";
import Link from "next/link";
import axios from "axios";

export default function NoticeCard({ post }) {
  const { author, description, id, title, writeDate, _id } = post;

  function deleteHandler() {
    const result = confirm("삭제하시겠습니까?");
    if (result) {
      axios
        .delete(`/api/delete/delete-post`, {
          data: {
            selectedPostId: _id,
          },
        }) //
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err.response.data.error));
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

"use client";

import { Card, Col } from "antd";
import Link from "next/link";
import Delete from "../delete-post/Delete";

export default function NoticeCard({ post }) {
  const { author, description, title, _id } = post;
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
      <Delete postId={_id} author={author} />
    </Col>
  );
}

const descriptionStyle = {
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
};

const cardMarginStyle = { marginTop: "12px" };

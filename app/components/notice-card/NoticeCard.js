"use client";

import React from "react";
import { Card, Col } from "antd";
import Link from "next/link";

export default function NoticeCard({ post }) {
  const { author, description, id, title, writeDate, _id } = post;
  return (
    <Col span={8}>
      <Link
        href={{
          pathname: `/posts/${_id}`,
        }}
      >
        <Card title={title} bordered={false}>
          {description}
        </Card>
      </Link>
    </Col>
  );
}

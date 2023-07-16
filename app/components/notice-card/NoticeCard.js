"use client";

import React from "react";
import { Card, Col } from "antd";

export default function NoticeCard({ post }) {
  const { author, description, id, title, writeDate, _id } = post;
  return (
    <Col span={8}>
      <Card title={title} bordered={false}>
        {description}
      </Card>
    </Col>
  );
}

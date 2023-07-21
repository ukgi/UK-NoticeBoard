"use client";

import { Row } from "antd";
import NoticeCard from "../notice-card/NoticeCard";

export default function CardList({ allPosts }) {
  return (
    <Row gutter={16}>
      {allPosts &&
        allPosts.map((postData) => (
          <NoticeCard key={postData.id} post={postData} />
        ))}
    </Row>
  );
}

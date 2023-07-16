"use client";

import { useEffect, useState } from "react";
import { Row } from "antd";
import NoticeCard from "./components/notice-card/NoticeCard";
import axios from "axios";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/posts") //
      .then((res) => setAllPosts(res.data.allPosts));
  }, []);
  return (
    <Row gutter={16}>
      {allPosts &&
        allPosts.map((postData) => (
          <NoticeCard key={postData.id} post={postData} />
        ))}
    </Row>
  );
}

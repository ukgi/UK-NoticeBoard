"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children, postId }) {
  const session = useSession();
  const [postedUserEmail, setPostedUserEmail] = useState();

  useEffect(() => {
    axios
      .get(`/api/${postId}`)
      .then((res) => setPostedUserEmail(res.data.userEmail))
      .catch(console.error);
  }, [postId]);

  if (session.status === "unauthenticated") {
    return <h1>해당 경로로 들어갈 수 없습니다...로그인 하세요...❌</h1>;
  }

  if (session.status === "authenticated" && !postedUserEmail) {
    return <h1>잠시만 기다려주세요...</h1>;
  }

  if (
    session.status === "authenticated" &&
    session.data.user.email !== postedUserEmail
  ) {
    return <h1>다른 사람의 게시물을 수정할 수 없습니다...❌</h1>;
  }

  return children;
}

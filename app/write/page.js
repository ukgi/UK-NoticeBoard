import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import React from "react";
import WriteForm from "../components/write-form/WriteForm";

export default async function Write() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <h1>해당 페이지에 접속할 수 없습니다...로그인해주세요!</h1>;
  }
  return <WriteForm />;
}

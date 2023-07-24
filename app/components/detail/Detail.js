"use client";

import { Descriptions } from "antd";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Divider } from "antd";
import CommentList from "../comment-list/CommentList";

export default function Detail({ data }) {
  const { author, description, title, writeDate, _id, userEmail } = data;
  const session = useSession();

  return (
    <>
      <Descriptions title='세부 정보' bordered>
        <Descriptions.Item label='제목'>{title}</Descriptions.Item>
        <Descriptions.Item label='작성자'>{author}</Descriptions.Item>
        <Descriptions.Item label='작성일'>
          {writeDate.substring(0, 10)}
        </Descriptions.Item>
        <Descriptions.Item label='작성글'>{description}</Descriptions.Item>
      </Descriptions>

      {(session.data && session.data.user.email === userEmail) ||
      (session.data && session.data.user.email === "admin@admin.com") ? (
        <Link href={`/edit/${_id}`}>수정하기</Link>
      ) : (
        <></>
      )}
      <Divider orientation='left'>댓글</Divider>
      <CommentList postId={_id} parentId={_id} author={author} />
    </>
  );
}

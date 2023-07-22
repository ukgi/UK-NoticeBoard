"use client";

import React from "react";
import { Descriptions } from "antd";
import Link from "next/link";

export default function Detail({ data }) {
  const { author, description, title, writeDate, _id } = data;
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
      <Link href={`/edit/${_id}`}>수정하기</Link>
    </>
  );
}

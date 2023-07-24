"use client";

import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import axios from "axios";
import moment from "moment"; // moment.js import
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const { TextArea } = Input;

export default function Edit({ postId }) {
  const [selectedPost, setSelectedPost] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showCompleteEditMessage, setShowCompleteEditMessage] = useState(false);
  const [failEdit, setFailEdit] = useState(false);
  const router = useRouter();
  const session = useSession();

  // 수정할 데이터를 폼 형식으로 보여줌
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/${postId}`)
      .then((res) => {
        setIsLoading(false);
        // moment.js 객체로 변환
        const momentSelectedPost = {
          ...res.data,
          writeDate: moment(res.data.writeDate),
        };
        setSelectedPost(momentSelectedPost);
      })
      .catch((error) => console.error(error.response.data));
  }, []);

  async function handleFormSubmit(values) {
    // 폼 데이터를 서버로 제출하는 로직 구현
    setIsLoading(true);
    axios
      .post("/api/edit", {
        editPostId: postId,
        editData: values,
      })
      .then((res) => {
        setIsLoading(false);
        setShowCompleteEditMessage(true);
        setTimeout(() => {
          setShowCompleteEditMessage(false);
        }, 4000);
      })
      .catch((error) => {
        setIsLoading(false);
        setFailEdit(error.response.data);
        setTimeout(() => {
          setFailEdit(false);
        }, 4000);
      });
  }

  function handleFormCancel() {
    return router.back();
  }

  if (isLoading || !selectedPost) {
    return <h1>로딩중 ...</h1>;
  }

  if (
    (selectedPost &&
      session.data &&
      selectedPost.userEmail === session.data.user.email) ||
    (selectedPost &&
      session.data &&
      session.data.user.email === process.env.NEXT_PUBLIC_ADMIN_USER_EMAIL)
  ) {
    return (
      <>
        {failEdit && <h1>{failEdit}</h1>}
        {showCompleteEditMessage && <h1>✅수정 완료되었습니다</h1>}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={selectedPost} // 초기값을 initialValues로 설정
          onFinish={handleFormSubmit} // 폼 제출 핸들러
          autoComplete="off"
        >
          <>
            <Form.Item
              label="제목"
              name="title"
              rules={[
                {
                  required: true,
                  message: "제목을 지어주세요!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="작성글"
              name="description"
              rules={[
                {
                  required: true,
                  message: "작성글을 기입해주세요!",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="작성날짜"
              name="writeDate"
              rules={[
                {
                  required: true,
                  message: "작성한 날짜를 기입해주세요!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="button"
              danger
              onClick={handleFormCancel}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  } else {
    return <h1>접근할 수 없습니다...😢</h1>;
  }
}

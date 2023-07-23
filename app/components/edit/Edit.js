"use client";

import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import axios from "axios";
import moment from "moment"; // moment.js import
import { useRouter } from "next/navigation";
const { TextArea } = Input;

export default function Edit({ postId }) {
  const [selectedPost, setSelectedPost] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showCompleteEditMessage, setShowCompleteEditMessage] = useState(false);
  const [failEdit, setFailEdit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`/api/${postId}`)
      .then((res) => {
        // moment.js 객체로 변환
        const momentSelectedPost = {
          ...res.data,
          writeDate: moment(res.data.writeDate),
        };
        setSelectedPost(momentSelectedPost);
      })
      .catch((error) => {
        console.error("Error fetching post data: ", error);
      });
  }, []);

  async function handleFormSubmit(values) {
    // 폼 데이터를 서버로 제출하는 로직 구현
    console.log(values);
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
        console.log(res.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setFailEdit(error.response.data.message);
        console.error(error.response.data.message);
      });
  }

  function handleFormCancel() {
    return router.back();
  }

  return (
    <div>
      {selectedPost && (
        <>
          {failEdit && <h1>{failEdit}</h1>}
          {showCompleteEditMessage && <h1>✅수정 완료되었습니다</h1>}
          {isLoading && <h1>로딩중...</h1>}
          {!isLoading && !failEdit && (
            <Form
              name='basic'
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
              autoComplete='off'
            >
              <>
                <Form.Item
                  label='제목'
                  name='title'
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
                  label='작성글'
                  name='description'
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
                  label='작성날짜'
                  name='writeDate'
                  rules={[
                    {
                      required: true,
                      message: "작성한 날짜를 기입해주세요!",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  label='작성자'
                  name='author'
                  rules={[
                    {
                      required: true,
                      message: "작성자를 입력해주세요!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type='primary' htmlType='submit'>
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
                  type='primary'
                  htmlType='button'
                  danger
                  onClick={handleFormCancel}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          )}
        </>
      )}
    </div>
  );
}

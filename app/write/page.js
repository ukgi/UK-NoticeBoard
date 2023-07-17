"use client";

import { Button, DatePicker, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
const { TextArea } = Input;

export default function Write() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  async function onFinish(values) {
    setIsLoading(true);
    axios
      .post("/api/write", {
        ...values,
        id: uuidV4(),
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setShowSuccessMessage(true);
        const timer = setTimeout(() => {
          setShowSuccessMessage(false);
        }, 4000);
      })
      .catch(console.error);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }
  return (
    <>
      {showSuccessMessage && <h2>성공적으로 등록되었습니다!</h2>}
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
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        {isLoading ? (
          <p>loading...</p>
        ) : (
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
        )}
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
      </Form>
    </>
  );
}

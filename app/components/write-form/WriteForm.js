"use client";

import { Button, DatePicker, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";
const { TextArea } = Input;

export default function WriteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  async function onFinish(values) {
    setIsLoading(true);
    axios
      .post("/api/write", values)
      .then((res) => {
        setIsLoading(false);
        setShowSuccessMessage(true);
        const timer = setTimeout(() => {
          setShowSuccessMessage(false);
        }, 4000);
      })
      .catch((err) => alert(err.response.data));
  }

  return (
    <>
      {showSuccessMessage && <h2>성공적으로 등록되었습니다!</h2>}
      {isLoading ? (
        <p>로딩중...⏰</p>
      ) : (
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
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
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
        </Form>
      )}
    </>
  );
}

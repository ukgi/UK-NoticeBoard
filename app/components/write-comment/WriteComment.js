"use client";

import { Button, Form, Input } from "antd";

export default function WriteComment({ onFinish }) {
  return (
    <Form
      name='commentForm'
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
      autoComplete='off'
    >
      <Form.Item
        label='Comment'
        name='comment'
        rules={[
          {
            message: "답글을 남겨주세요...",
          },
        ]}
      >
        <Input />
      </Form.Item>
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
  );
}

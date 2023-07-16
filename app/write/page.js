"use client";

import { Button, DatePicker, Form, Input } from "antd";
import axios from "axios";
import { v4 as uuidV4 } from "uuid";
const { TextArea } = Input;
async function onFinish(values) {
  console.log("Success:", values);
  axios
    .post("/api/write", {
      ...values,
      id: uuidV4(),
    })
    .then((res) => console.log(res.data))
    .catch(console.error);
}
function onFinishFailed(errorInfo) {
  console.log("Failed:", errorInfo);
}
export default function Write() {
  return (
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

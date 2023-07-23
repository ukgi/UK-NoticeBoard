"use client";

import { Button, Form, Input } from "antd";
import axios from "axios";
import { useState } from "react";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default function RegisterForm() {
  const [form] = Form.useForm();
  const [isRegister, setIsRegister] = useState(false);

  function registerUserDataHandler(values) {
    axios
      .post("/api/auth/signup", values)
      .then((res) => {
        setIsRegister(res.data);
        setTimeout(() => {
          setIsRegister(false);
        }, 4000);
      })
      .catch((err) => {
        setIsRegister(err.response.data);
        setTimeout(() => {
          setIsRegister(false);
        }, 4000);
      });
  }

  return (
    <>
      {isRegister && <h1>{isRegister}</h1>}
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={registerUserDataHandler}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name='name'
          label='Name'
          tooltip='What do you want others to call you?'
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

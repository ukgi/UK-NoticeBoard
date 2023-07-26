'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Upload, Image } from 'antd';
import axios from 'axios';
import { useState } from 'react';
const { TextArea } = Input;

export default function WriteForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [src, setSrc] = useState();

  async function onFinish(values) {
    console.log(values);
    setIsLoading(true);
    axios
      .post('/api/post/write', {
        ...values,
        image: src,
      })
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
                message: '제목을 지어주세요!',
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
                message: '작성글을 기입해주세요!',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                let file = e.target.files[0];
                let filename = encodeURIComponent(file.name);
                let res = await fetch('/api/post/image?file=' + filename);
                res = await res.json();

                //S3 업로드
                const formData = new FormData();
                Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
                  formData.append(key, value);
                });
                let 업로드결과 = await fetch(res.url, {
                  method: 'POST',
                  body: formData,
                });
                console.log(업로드결과);

                if (업로드결과.ok) {
                  console.log(업로드결과.url);
                  setSrc(업로드결과.url + '/' + filename);
                } else {
                  console.log('실패');
                }
              }}
            />
            <img src={src} style={{ width: '300px', height: '300px' }} />
          </div>
          <Form.Item
            label="작성날짜"
            name="writeDate"
            rules={[
              {
                required: true,
                message: '작성한 날짜를 기입해주세요!',
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

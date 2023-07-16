"use client";

import React from "react";
import { Button, Space } from "antd";
import { Layout } from "antd";
const { Header } = Layout;
import styles from "./nav-bar.module.css";

export default function NavigationBar() {
  return (
    <Header className={styles.header}>
      <div>
        <h1>UKGI NOTICEBOARD</h1>
      </div>
      <Space wrap>
        <Button type='primary'>작성하기</Button>
        <Button type='primary' danger>
          삭제하기
        </Button>
      </Space>
    </Header>
  );
}

"use client";

import React from "react";
import { Button, Space } from "antd";
import { Layout } from "antd";
const { Header } = Layout;
import styles from "./nav-bar.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NavigationBar() {
  const router = useRouter();

  function linkToWritePageHandler() {
    router.push("/write");
  }

  return (
    <Header className={styles.header}>
      <Link className={styles.logo} href='/'>
        UKGI NOTICEBOARD
      </Link>
      <Space wrap>
        <Button type='primary' onClick={linkToWritePageHandler}>
          작성하기
        </Button>
        <Button type='primary' danger>
          삭제하기
        </Button>
      </Space>
    </Header>
  );
}

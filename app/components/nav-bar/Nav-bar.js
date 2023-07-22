"use client";

import React, { useEffect, useState } from "react";
import { Button, Space } from "antd";
import { Layout } from "antd";
import { LoginOutlined } from "@ant-design/icons";
const { Header } = Layout;
import styles from "./nav-bar.module.css";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useLoginContext } from "@/app/context/LoginContext";

export default function NavigationBar() {
  const router = useRouter();
  const session = useSession();
  const loginContext = useLoginContext();
  const pathname = usePathname();
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setIsHome(pathname === "/");
  }, [pathname]);

  function linkToWritePageHandler() {
    router.push("/write");
  }

  function linkToListPage() {
    router.push("/list");
  }

  function linkToHomePage() {
    router.push("/");
  }

  useEffect(() => {
    if (session.status === "authenticated") {
      return loginContext.loginHandler(session);
    }
    if (session.status === "unauthenticated") {
      return loginContext.logoutHandler();
    }
  }, [session]);

  return (
    <Header className={styles.header}>
      <Link className={styles.logo} href='/'>
        UKGI NOTICEBOARD
      </Link>
      <Space wrap>
        {loginContext.loginData ? (
          <>
            {isHome ? (
              <Button type='primary' onClick={linkToListPage}>
                전체 글보기
              </Button>
            ) : (
              <Button type='primary' onClick={linkToHomePage}>
                홈으로 돌아가기
              </Button>
            )}
            <Button type='primary' onClick={linkToWritePageHandler}>
              작성하기
            </Button>
            <Button type='primary' danger onClick={signOut}>
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button type='primary' onClick={signIn}>
              <LoginOutlined style={loginIconStyle} />
              로그인
            </Button>
          </>
        )}
      </Space>
    </Header>
  );
}

const loginIconStyle = {
  fontSize: "16px",
};

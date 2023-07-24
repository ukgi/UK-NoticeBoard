"use client";

import { useEffect, useState } from "react";
import { Button, Space } from "antd";
import { Layout } from "antd";
import { LoginOutlined, HomeOutlined, EditOutlined } from "@ant-design/icons";
const { Header } = Layout;
import styles from "./nav-bar.module.css";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavigationBar() {
  const router = useRouter();
  const session = useSession();
  const pathname = usePathname();
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setIsHome(pathname === "/");
  }, [pathname]);

  function linkToListPage() {
    router.push("/list");
  }

  function linkToRegisterPage() {
    router.push("/register");
  }

  return (
    <Header className={styles.header}>
      <Link className={styles.logo} href="/">
        UKGI NOTICEBOARD
      </Link>
      <Space wrap>
        {session.data ? (
          <>
            {session.data.user.email === "admin@admin.com" && <h1>ADMIN</h1>}
            <Link href={"/write"}>
              <EditOutlined style={{ fontSize: "22px", color: "white" }} />
            </Link>
            <Button type="primary" danger onClick={signOut}>
              로그아웃
            </Button>
          </>
        ) : (
          <>
            {isHome ? (
              <Button type="primary" onClick={linkToListPage}>
                전체 글보기
              </Button>
            ) : (
              <Link href={"/"}>
                <HomeOutlined style={{ fontSize: "22px", color: "white" }} />
              </Link>
            )}
            <Button type="primary" onClick={signIn}>
              <LoginOutlined style={loginIconStyle} />
              로그인
            </Button>
            <Button type="primary" onClick={linkToRegisterPage}>
              회원가입
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

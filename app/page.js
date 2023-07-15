import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>홈페이지</h1>
      <Link href='/list'>리스트 페이지로 이동</Link>
    </div>
  );
}

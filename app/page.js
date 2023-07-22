import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function Home() {
  // let session = await getServerSession(authOptions);
  // if (session) {
  //   console.log(session);
  // }
  return (
    <>
      <h1>홈 화면</h1>
    </>
  );
}

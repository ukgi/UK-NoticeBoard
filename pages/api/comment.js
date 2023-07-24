import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { connectDatabase, insertDocument } from "@/helpers/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // 로그인이 되어있지 않으면, 로그인하라고 유도
    try {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        throw new Error("로그인이 필요합니다...로그인해주세요");
      }

      // 전달한 req.body 데이터를
      // DB의 comment collection에 저장한다.
      // 하지만 저장할 때, 내가 어떤 포스팅의 댓글인지 명시하기 위해서
      // 해당 포스팅의 _id를 적어준다.(이건 클라이언트 측에서 적어서 서버에 보낸다)

      const client = await connectDatabase();
      const result = await insertDocument(client, "comment", req.body);

      if (!result.acknowledged) {
        throw new Error("코멘트가 저장되지 않았습니다...😢");
      }

      client.close();
      res.status(200).json({ message: "성공!", data: result });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

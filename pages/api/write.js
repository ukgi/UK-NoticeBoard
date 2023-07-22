import { connectDatabase, insertDocument } from "@/helpers/db-util";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    if (session) {
      let client;
      try {
        client = await connectDatabase();
      } catch (error) {
        client.close();
        return res
          .status(500)
          .json({ error: "클라이언트 연결에 실패했습니다..." });
      }
      try {
        req.body.author = session.user.name;
        req.body.userEmail = session.user.email;
        const inputData = req.body;

        if (
          !inputData.title ||
          !inputData.description ||
          !inputData.writeDate ||
          !inputData.author
        ) {
          throw new Error("입력값이 올바르지 않습니다..");
        }
        const result = await insertDocument(client, "post", inputData);
        client.close();
        return res.status(200).json({ message: "처리완료", inputData });
      } catch (err) {
        client.close();
        return res
          .status(500)
          .json({ error: "데이터베이스에 입력을 실패했습니다..." });
      }
    } else {
      return res
        .status(500)
        .json({ error: "로그인하지 않으면 글을 적을 수 없습니다..." });
    }
  }
}

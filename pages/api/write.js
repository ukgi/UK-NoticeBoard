import { connectDatabase, insertDocument } from "@/helpers/db-util";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === "POST") {
    try {
      if (session) {
        const client = await connectDatabase();

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
      } else {
        throw new Error("로그인 세션이 존재하지 않습니다...");
      }
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

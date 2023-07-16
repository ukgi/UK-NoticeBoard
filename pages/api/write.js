import { connectDatabase, insertDocument } from "@/helpers/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "클라이언트 연결에 실패했습니다..." });
    }
    try {
      const inputData = req.body;
      const result = await insertDocument(client, "post", inputData);
      return res.status(200).json({ message: "처리완료", inputData });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "데이터베이스에 입력을 실패했습니다..." });
    }
  }
}

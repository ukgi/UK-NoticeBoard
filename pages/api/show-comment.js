import { connectDatabase } from "@/helpers/db-util";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    let client;
    try {
      client = await connectDatabase();
      const db = client.db();
      const result = await db
        .collection("comment")
        .find({ parent: req.query.postId })
        .toArray();

      if (!result) {
        throw new Error("서버 오류로 인해 댓글을 읽어올 수 없습니다...");
      }

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err.message);
    } finally {
      client.close();
    }
  }
}

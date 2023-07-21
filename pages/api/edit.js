import { connectDatabase, replaceDocument } from "@/helpers/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let client;
      client = await connectDatabase();

      const result = await replaceDocument(
        client,
        "post",
        req.body.editPostId,
        req.body.editData
      );

      if (result.matchedCount === 1 && result.modifiedCount === 1) {
        res
          .status(200)
          .json({ message: "수정 완료...!", editData: req.body.editData });
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(500).json({ message: "수정에 실패했습니다...😱", error });
    }
  }
}

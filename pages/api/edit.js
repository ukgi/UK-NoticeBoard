import {
  connectDatabase,
  getSelectedDocuments,
  replaceDocument,
} from "@/helpers/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await connectDatabase();

      const result = await replaceDocument(
        client,
        "post",
        req.body.editPostId,
        req.body.editData
      );

      console.log(result);

      if (result.matchedCount === 1 && result.modifiedCount === 1) {
        res
          .status(200)
          .json({ message: "수정 완료...!", editData: req.body.editData });
      } else if (result.modifiedCount === 0) {
        throw new Error("수정된 내용이 없습니다...");
      } else {
        throw new Error("수정에 실패했습니다...😢");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}

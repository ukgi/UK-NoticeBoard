import { connectDatabase, deleteSelectedDocument } from "@/helpers/db-util";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const client = await connectDatabase();
      const result = await deleteSelectedDocument(
        client,
        "post",
        req.body.selectedPostId
      );
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "삭제요청 완료...✅", result });
        return client.close();
      } else {
        throw new Error();
      }
    } catch (error) {
      res.status(500).json({ error: "삭제요청이 실패했습니다...😱" });
    }
  }
}

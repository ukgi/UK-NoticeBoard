import {
  connectDatabase,
  deleteSelectedDocument,
  getSelectedDocuments,
} from "@/helpers/db-util";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const client = await connectDatabase();
      const selectedPost = await getSelectedDocuments(
        client,
        "post",
        req.body.selectedPostId
      );

      if (!selectedPost) {
        throw new Error("이미 삭제되었습니다...");
      }
      if (session.user.email !== selectedPost.userEmail) {
        throw new Error("자신이 작성하지 않은 글은 삭제할 수 없습니다...❌");
      }

      const result = await deleteSelectedDocument(
        client,
        "post",
        req.body.selectedPostId
      );

      if (result.deletedCount === 1) {
        res.status(200).json({ message: "삭제요청 완료...✅", result });
        return client.close();
      } else {
        throw new Error("삭제요청이 실패했습니다...😱");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

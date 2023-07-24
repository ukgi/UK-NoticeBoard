import { connectDatabase, getSelectedDocuments } from "@/helpers/db-util";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const selectedPostId = req.query.selectedPostId;

    try {
      const client = await connectDatabase();
      const selectedPost = await getSelectedDocuments(
        client,
        "post",
        selectedPostId
      );

      if (!selectedPost) {
        throw new Error("해당 게시물은 존재하지 않습니다...");
      }

      client.close();
      return res.status(200).json(selectedPost);
    } catch (error) {
      client.close();
      return res.status(500).json(error.message);
    }
  }
}

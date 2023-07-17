import { connectDatabase, getSelectedDocuments } from "@/helpers/db-util";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const selectedPostId = req.query.selectedPostId;
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      return res
        .status(500)
        .json({ error: "클라이언트 연결에 실패했습니다..." });
    }

    try {
      const selectedPost = await getSelectedDocuments(
        client,
        "post",
        selectedPostId
      );
      client.close();
      return res.status(200).json({ ...selectedPost });
    } catch (error) {
      client.close();
      return res
        .status(500)
        .json({ error: "데이터를 가져오는데 실패했습니다..." });
    }
  }
}

import {
  connectDatabase,
  getSelectedDocuments,
  replaceDocument,
} from "@/helpers/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);

    let client;

    client = await connectDatabase();
    const selectedPost = await getSelectedDocuments(
      client,
      "post",
      req.body.editPostId
    );
    const result = await replaceDocument(
      client,
      "post",
      selectedPost,
      req.body.editData
    );
    res
      .status(200)
      .json({ message: "수정 완료...!", editData: req.body.editData });
  }
}

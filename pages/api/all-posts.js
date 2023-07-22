import { connectDatabase, getAllDocuments } from "@/helpers/db-util";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = await connectDatabase();
    const allPosts = await getAllDocuments(client, "post", { _id: -1 });

    return res.status(200).json(allPosts);
  }
}

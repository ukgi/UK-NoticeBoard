import { connectDatabase, getAllDocuments } from "@/helpers/db-util";
import CardList from "./components/card-list/CardList";

export default async function Home() {
  const client = await connectDatabase();
  const allPosts = await getAllDocuments(client, "post", { _id: -1 });

  return <CardList allPosts={allPosts} />;
}

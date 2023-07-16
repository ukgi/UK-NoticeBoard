import { connectDatabase, getSelectedDocuments } from "@/helpers/db-util";

export default async function Detail(props) {
  const client = await connectDatabase();
  const selectedPost = await getSelectedDocuments(
    client,
    "post",
    props.params.postId
  );
  const { title, author, description, writeDate } = selectedPost;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <div>
        <span>{author}</span>
        <span>{writeDate}</span>
      </div>
    </div>
  );
}

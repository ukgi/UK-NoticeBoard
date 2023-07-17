import { connectDatabase, getSelectedDocuments } from "@/helpers/db-util";
import Link from "next/link";

// api 라우팅을 이용해서 클라이언트 컴포넌트로 구현해보기
export default async function Detail(props) {
  const client = await connectDatabase();
  const selectedPost = await getSelectedDocuments(
    client,
    "post",
    props.params.postId
  );
  const { title, author, description, writeDate, _id } = selectedPost;
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <div>
        <span>{author}</span>
        <span>{writeDate}</span>
      </div>
      <Link href={`/edit/${_id}`}>수정하기</Link>
    </div>
  );
}

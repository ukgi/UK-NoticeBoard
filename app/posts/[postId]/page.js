import Detail from "@/app/components/detail/Detail";
import { connectDatabase, getSelectedDocuments } from "@/helpers/db-util";

// api 라우팅을 이용해서 클라이언트 컴포넌트로 구현해보기
export default async function DetailPage(props) {
  const client = await connectDatabase();
  const selectedPost = await getSelectedDocuments(
    client,
    "post",
    props.params.postId
  );

  return <Detail data={selectedPost} />;
}

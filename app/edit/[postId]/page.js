import Edit from "@/app/components/edit/Edit";
import ProtectedRoute from "@/app/components/protectedRoute/ProtectedRoute";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function EditPage(props) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    return <h1>로그인이 필요합니다...로그인해주세요</h1>;
  }
  return <Edit postId={props.params.postId} />;
}

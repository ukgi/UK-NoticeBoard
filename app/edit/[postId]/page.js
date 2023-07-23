import Edit from "@/app/components/edit/Edit";
import ProtectedRoute from "@/app/components/protectedRoute/ProtectedRoute";

export default function EditPage(props) {
  return (
    <ProtectedRoute postId={props.params.postId}>
      <Edit postId={props.params.postId} />
    </ProtectedRoute>
  );
}

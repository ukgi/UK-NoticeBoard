import Detail from "@/app/components/detail/Detail";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export default async function DetailPage(props) {
  let selectedPost;
  try {
    const res = await fetch(
      `http://localhost:3000/api/${props.params.postId}`,
      {
        next: { revalidate: 10 },
      }
    );
    selectedPost = await res.json();
  } catch (error) {
    return notFound();
  }

  return <Detail data={selectedPost} />;
}

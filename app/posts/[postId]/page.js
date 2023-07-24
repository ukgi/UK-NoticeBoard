import Detail from "@/app/components/detail/Detail";

export const dynamic = "force-static";

export default async function DetailPage(props) {
  const res = await fetch(`http://localhost:3000/api/${props.params.postId}`, {
    next: { revalidate: 10 },
  });
  const selectedPost = await res.json();

  return <Detail data={selectedPost} />;
}

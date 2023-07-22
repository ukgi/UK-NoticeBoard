import CardList from "../components/card-list/CardList";

export const dynamic = "force-dynamic";

async function getAllPosts() {
  const res = await fetch("http://localhost:3000/api/all-posts", {
    next: {
      revalidate: 10,
    },
  });
  return res.json();
}

export default async function List() {
  const data = await getAllPosts();
  return data && <CardList allPosts={data} />;
}

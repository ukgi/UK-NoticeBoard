import React from "react";
import Image from "next/image";
import 이미지 from "/public/nextjs.png";
import { connectDatabase, getAllDocuments } from "@/helpers/db-util";

export default async function Page() {
  const client = await connectDatabase();
  const AllDocuments = await getAllDocuments(client, "post", { _id: -1 });
  console.log(AllDocuments);
  return (
    <div>
      <h1>리스트 페이지</h1>
      <Image src={이미지} alt='example' />
    </div>
  );
}

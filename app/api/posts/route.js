import { connectDatabase, getAllDocuments } from "@/helpers/db-util";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await connectDatabase();
  const allPosts = await getAllDocuments(client, "post", { _id: -1 });

  return NextResponse.json({ allPosts });
}

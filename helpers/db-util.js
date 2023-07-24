import { MongoClient, ObjectId } from "mongodb";

export async function connectDatabase() {
  try {
    const client = await MongoClient.connect(
      process.env.NEXT_PUBLIC_MONGODB_CONNECT_DB
    );
    return client;
  } catch (error) {
    throw new Error("클라이언트 연결에 실패했습니다...😱");
  }
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  let AllDocuments = await db
    .collection(collection)
    .find()
    .sort(sort) // _id를 내림차순으로 정렬
    .toArray();

  AllDocuments = AllDocuments.map((post) => {
    post._id = post._id.toString();
    return post;
  });

  return AllDocuments;
}

export async function getSelectedDocuments(client, collection, postId) {
  const db = client.db();
  const result = await db
    .collection(collection)
    .findOne({ _id: new ObjectId(postId) });

  if (result) {
    result._id = result._id.toString();
  }

  return result;
}

// edit
export async function replaceDocument(
  client,
  collection,
  selectedPostId,
  editPost
) {
  const db = client.db();
  const result = await db
    .collection(collection)
    .updateOne({ _id: new ObjectId(selectedPostId) }, { $set: editPost });

  return result;
}

// delete
export async function deleteSelectedDocument(
  client,
  collection,
  selectedPostId
) {
  const db = client.db();

  const result = await db
    .collection(collection)
    .deleteOne({ _id: new ObjectId(selectedPostId) });

  return result;
}

// find by email
export async function findByEmail(client, email) {
  const db = client.db();
  const user = await db.collection("user_cred").findOne({ email });
  return user;
}

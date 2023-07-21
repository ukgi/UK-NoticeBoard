import { MongoClient, ObjectId } from "mongodb";

export async function connectDatabase() {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://UKGI:xn1945qh@cluster0.iwnfbid.mongodb.net/forum?retryWrites=true&w=majority"
    );
    return client;
  } catch (error) {
    console.error("클라이언트 연결에 실패했습니다...😱", error);
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
  if (result) {
    result._id = result._id.toString();
  }
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

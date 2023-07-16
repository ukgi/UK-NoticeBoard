import { MongoClient, ObjectId } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://UKGI:xn1945qh@cluster0.iwnfbid.mongodb.net/forum?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const AllDocuments = await db
    .collection(collection)
    .find()
    .sort(sort) // _id를 내림차순으로 정렬
    .toArray();

  return AllDocuments;
}

export async function getSelectedDocuments(client, collection, postId) {
  const db = client.db();
  const result = await db
    .collection(collection)
    .findOne({ _id: new ObjectId(postId) });
  return result;
}

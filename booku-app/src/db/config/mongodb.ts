import { Db, MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "";
let db: Db;
let client: MongoClient;

export function connect() {
  client = new MongoClient(MONGODB_URI);
  db = client.db("BookU");
}

export function getDb() {
  if (!db) {
    connect();
  }
  return db;
}

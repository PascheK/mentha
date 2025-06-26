// lib/db.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;


if (!process.env.MONGO_URI) {
  throw new Error("❌ Please add your MONGO_URI to .env");
}


const client = new MongoClient(uri);
const db = client.db();


export { db };

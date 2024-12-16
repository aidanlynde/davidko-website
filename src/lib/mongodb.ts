import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Missing MONGODB_URI');
}

let cachedClient: any = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  // If we have a cached client and db, use them
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // If no cached client exists, create one
  const client = await MongoClient.connect(process.env.MONGODB_URI!);

  const db = client.db(); // Get the default database

  // Cache the client and db
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
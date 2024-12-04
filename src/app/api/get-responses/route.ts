// src/app/api/get-responses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(); // Connect to the default database
    const collection = db.collection('formResponses'); // Collection name

    const responses = await collection.find({}).sort({ createdAt: -1 }).toArray(); // Retrieve data

    return NextResponse.json(responses, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}

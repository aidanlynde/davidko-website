// src/app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(); // Connect to the default database
    const collection = db.collection('formResponses'); // Collection name

    const data = await req.json();
    data.createdAt = new Date(); // Add a timestamp

    await collection.insertOne(data); // Save to MongoDB

    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ message: 'Error saving data' }, { status: 500 });
  }
}

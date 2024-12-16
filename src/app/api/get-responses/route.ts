// src/app/api/get-responses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('formResponses');

    // Get all responses, sorted by creation date (newest first)
    const responses = await collection.find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(responses);
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { message: 'Error fetching data', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
// src/app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('formResponses');

    const data = await req.json();
    data.createdAt = new Date();

    await collection.insertOne(data);
    
    return NextResponse.json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json(
      { message: 'Error saving data', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// src/app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    // Verify request body
    const body = await req.json();
    console.log('Received data:', body);

    // Connect to MongoDB
    const client = await clientPromise;
    console.log('MongoDB connected');

    const db = client.db();
    const collection = db.collection('formResponses');

    // Add timestamp
    const documentToInsert = {
      ...body,
      createdAt: new Date()
    };

    // Insert document
    const result = await collection.insertOne(documentToInsert);
    console.log('Insert result:', result);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      id: result.insertedId
    });

  } catch (error) {
    // Log the full error
    console.error('API Error:', error);

    // Return error response
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    await db.command({ ping: 1 });
    return NextResponse.json({ message: 'Database connection successful' });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/libs/mongoose';
import CalendarEvent from '@/libs/models/CalendarEvent';

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const { title, start, end, userId } = await req.json(); // Parse the body from the request

    // Ensure userId is provided
    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const newEvent = await CalendarEvent.create({ title, start, end, userId });
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create event', details: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    await connectMongo();
    const events = await CalendarEvent.find();
    return NextResponse.json(events, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch events', details: error.message }, { status: 400 });
  }
}

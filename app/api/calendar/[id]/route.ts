import { NextRequest, NextResponse } from 'next/server';
import connectMongo from '@/libs/mongoose';
import CalendarEvent from '@/libs/models/CalendarEvent';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const id = params.id;
    const updatedData = await req.json();
    const updatedEvent = await CalendarEvent.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to update event', details: error.message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectMongo();
    const id = params.id;
    await CalendarEvent.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to delete event', details: error.message }, { status: 400 });
  }
}
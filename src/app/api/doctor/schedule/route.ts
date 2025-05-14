import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('doctorId');

    if (!doctorId) {
      return NextResponse.json(
        { success: false, message: 'Doctor ID is required' },
        { status: 400 }
      );
    }

    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        doctorId: doctorId,
      },
      orderBy: [{ day: 'asc' }, { startTime: 'asc' }],
    });

    return NextResponse.json({ success: true, data: timeSlots });
  } catch (error) {
    console.error('Error fetching time slots:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching time slots' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { doctorId, day, startTime, endTime } = data;

    if (!doctorId || !day || !startTime || !endTime) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    const newTimeSlot = await prisma.timeSlot.create({
      data: {
        doctorId,
        day,
        startTime,
        endTime,
      },
    });

    return NextResponse.json({
      success: true,
      data: newTimeSlot,
    });
  } catch (error) {
    console.error('Error creating time slot:', error);
    return NextResponse.json(
      { success: false, message: 'Error creating time slot' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const doctorId = searchParams.get('doctorId');

    if (!id || !doctorId) {
      return NextResponse.json(
        { success: false, message: 'Time slot ID and Doctor ID are required' },
        { status: 400 }
      );
    }

    await prisma.timeSlot.delete({
      where: {
        id: id,
        doctorId: doctorId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting time slot:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting time slot' },
      { status: 500 }
    );
  }
}

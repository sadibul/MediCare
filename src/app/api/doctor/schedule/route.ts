import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Time slot ID is required' },
        { status: 400 }
      );
    }

    // Delete the time slot
    await prisma.timeSlot.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting time slot:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete time slot' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, doctorId, startTime, endTime } = await request.json();

    if (!id || !doctorId) {
      return NextResponse.json(
        { success: false, message: 'Time slot ID and Doctor ID are required' },
        { status: 400 }
      );
    }

    const updatedTimeSlot = await prisma.timeSlot.update({
      where: {
        id: id,
        doctorId: doctorId,
      },
      data: {
        startTime,
        endTime,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedTimeSlot,
    });
  } catch (error) {
    console.error('Error updating time slot:', error);
    return NextResponse.json(
      { success: false, message: 'Error updating time slot' },
      { status: 500 }
    );
  }
}

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('doctorId');

    if (!doctorId) {
      return NextResponse.json(
        { success: false, message: 'Doctor ID is required' },
        { status: 400 }
      );
    }

    // Get doctor's time slots
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        doctorId: doctorId,
      },
    });

    // Extract unique days of the week from the doctor's schedule
    const availableDays = [...new Set(timeSlots.map((slot) => slot.day))];

    return NextResponse.json({ success: true, days: availableDays });
  } catch (error) {
    console.error('Error fetching available days:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching available days' },
      { status: 500 }
    );
  }
}

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('doctorId');
    const day = searchParams.get('day'); // Now expecting day of week instead of date

    if (!doctorId || !day) {
      return NextResponse.json(
        { success: false, message: 'Doctor ID and day are required' },
        { status: 400 }
      );
    }

    // Get doctor's time slots for that day
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        doctorId: doctorId,
        day: day, // Use the day directly
      },
    });

    // Generate time slots from start and end times
    const availableTimes: string[] = [];

    timeSlots.forEach((slot) => {
      const [startHour, startMinute] = slot.startTime.split(':').map(Number);
      const [endHour, endMinute] = slot.endTime.split(':').map(Number);

      // Create hourly slots between start and end time
      let currentHour = startHour;
      while (currentHour < endHour) {
        const formattedHour = currentHour % 12 || 12;
        const amPm = currentHour >= 12 ? 'PM' : 'AM';
        availableTimes.push(`${formattedHour}:00 ${amPm}`);
        currentHour++;
      }
    });

    return NextResponse.json({ success: true, times: availableTimes });
  } catch (error) {
    console.error('Error fetching available times:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching available times' },
      { status: 500 }
    );
  }
}

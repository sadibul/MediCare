import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Find doctors who have at least one time slot
    const doctors = await prisma.doctor.findMany({
      where: {
        timeSlots: {
          some: {}, // This means "has at least one time slot"
        },
      },
      include: {
        timeSlots: true, // Include time slots for each doctor
      },
    });

    // Format the response to include working hours
    const formattedDoctors = doctors.map((doctor) => {
      // Create a formatted working hours string from timeSlots
      let doctorWorkingHours = '';
      if (doctor.timeSlots.length > 0) {
        const dayMap = {};

        // Group time slots by day
        doctor.timeSlots.forEach((slot) => {
          if (!dayMap[slot.day]) {
            dayMap[slot.day] = [];
          }
          dayMap[slot.day].push(`${slot.startTime}-${slot.endTime}`);
        });

        // Create formatted string
        doctorWorkingHours = Object.entries(dayMap)
          .map(([day, times]) => `${day}: ${times.join(', ')}`)
          .join(' | ');
      }

      // Return doctor with formatted hours and without raw timeSlots
      const { timeSlots, ...doctorData } = doctor;
      return {
        ...doctorData,
        doctorWorkingHours,
      };
    });

    return NextResponse.json({ success: true, doctors: formattedDoctors });
  } catch (error) {
    console.error('Error fetching available doctors:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching available doctors' },
      { status: 500 }
    );
  }
}

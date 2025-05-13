import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('Login attempt:', { email, password });

    const doctor = await prisma.doctor.findUnique({
      where: {
        doctorEmail: email,
      },
    });

    console.log('Found doctor:', doctor);

    if (doctor && doctor.password === password) {
      const { password: _, ...doctorData } = doctor;
      console.log('Login successful');
      return NextResponse.json({
        success: true,
        data: doctorData,
      });
    }

    console.log('Login failed - Invalid credentials');
    return NextResponse.json({
      success: false,
      message: 'Invalid email or password',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during login' },
      { status: 500 }
    );
  }
}

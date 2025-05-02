import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const medicines = await prisma.medicine.findMany();
    return NextResponse.json(medicines);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching medicines' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const medicine = await prisma.medicine.create({
      data: body,
    });
    return NextResponse.json(medicine);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating medicine' },
      { status: 500 }
    );
  }
}

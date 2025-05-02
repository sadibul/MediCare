import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const medicine = await prisma.medicine.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(medicine);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating medicine' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.medicine.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error deleting medicine' },
      { status: 500 }
    );
  }
}

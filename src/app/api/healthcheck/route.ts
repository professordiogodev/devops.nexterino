import { NextResponse } from 'next/server';

export function GET() {
  return new NextResponse('It works!', { status: 200 });
}

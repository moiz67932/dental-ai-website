import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  try {
    // Mock stats - in production, this would fetch from your database
    const stats = {
      calls_handled: 12847 + Math.floor(Math.random() * 100),
      appointments_booked: 8932 + Math.floor(Math.random() * 50),
    };

    return NextResponse.json(stats, {
      headers: {
        'Cache-Control': 's-maxage=10, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const clinicId = searchParams.get('clinicId');
    const { type } = params;

    if (!clinicId) {
      return NextResponse.json(
        { error: 'Clinic ID is required' },
        { status: 400 }
      );
    }

    // Mock metrics data - in a real app, this would fetch from Prometheus/database
    const mockData = {
      bookings: {
        total: Math.floor(Math.random() * 50) + 10,
        today: Math.floor(Math.random() * 10) + 2,
        trend: '+12%',
      },
      calls: {
        total: Math.floor(Math.random() * 200) + 50,
        answered: Math.floor(Math.random() * 180) + 45,
        missed: Math.floor(Math.random() * 20) + 5,
      },
      system: {
        status: 'online',
        uptime: '99.9%',
        cpu: '12%',
        memory: '340MB',
      },
    };

    return NextResponse.json(mockData[type] || {});
  } catch (error) {
    console.error('Metrics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    );
  }
}
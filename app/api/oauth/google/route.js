import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      // Redirect to Google OAuth
      const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      googleAuthUrl.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID);
      googleAuthUrl.searchParams.set('redirect_uri', `${process.env.NEXTAUTH_URL}/api/oauth/google`);
      googleAuthUrl.searchParams.set('response_type', 'code');
      googleAuthUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/calendar');
      googleAuthUrl.searchParams.set('access_type', 'offline');
      googleAuthUrl.searchParams.set('prompt', 'consent');

      return NextResponse.redirect(googleAuthUrl.toString());
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/oauth/google`,
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      throw new Error('Failed to get access token');
    }

    // Get calendar info
    const calendarResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const calendar = await calendarResponse.json();

    // Redirect back to wizard with success
    const redirectUrl = new URL(`${process.env.NEXTAUTH_URL}/wizard/2`);
    redirectUrl.searchParams.set('google_auth', 'success');
    redirectUrl.searchParams.set('refresh_token', tokens.refresh_token);
    redirectUrl.searchParams.set('calendar_id', calendar.id);

    return NextResponse.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('Google OAuth error:', error);
    
    const redirectUrl = new URL(`${process.env.NEXTAUTH_URL}/wizard/2`);
    redirectUrl.searchParams.set('google_auth', 'error');
    redirectUrl.searchParams.set('error', error.message);

    return NextResponse.redirect(redirectUrl.toString());
  }
}
'use client';

import { Button } from '@/components/ui/button';
import { Chrome } from 'lucide-react';
import { useState } from 'react';

export default function GoogleAuthButton({ onSuccess, disabled }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      // Redirect to Google OAuth
      window.location.href = '/api/oauth/google';
    } catch (error) {
      console.error('Google auth error:', error);
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleAuth}
      disabled={disabled || loading}
      variant="outline"
      className="w-full"
    >
      <Chrome className="mr-2 h-4 w-4" />
      {loading ? 'Connecting...' : 'Connect Google Calendar'}
    </Button>
  );
}
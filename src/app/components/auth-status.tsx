// app/components/auth-status.tsx
'use client';

import { useSession } from 'next-auth/react';

// Client component to display the user's current session status
export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading session...</p>;
  }

  if (session?.user) {
    return (
      <p className="text-lg mb-4">
        Logged in as **{session.user.email}**
      </p>
    );
  }

  return <p className="text-lg mb-4 text-red-500">Not logged in.</p>;
}
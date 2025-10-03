// app/components/auth-button.tsx
'use client';

import { signIn, signOut } from 'next-auth/react'; // Import client-side session and actions
import { useSession } from 'next-auth/react'; 
import { Button } from '@/components/ui/button'; // Assuming you have a button component

export default function AuthButton() {
  // Use the client-side hook to check the session status
  const { data: session, status } = useSession();

  // If session is loading, display a disabled button or spinner
  if (status === 'loading') {
    return (
      <Button disabled>
        Loading...
      </Button>
    );
  }

  // If the user is logged in, show the Sign Out button
  if (session) {
    return (
      <Button 
        onClick={() => signOut()} // Call the client-side signOut function
        variant="destructive" // Example style for a sign-out button
      >
        Sign Out ({session.user?.name || session.user?.email})
      </Button>
    );
  }

  // If the user is logged out, show the Sign In button
  return (
    <Button 
      onClick={() => signIn('google')} // Call the client-side signIn function for Google
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      Sign In with Google
    </Button>
  );
}
// app/(auth)/signin/page.tsx
import { signIn } from '../../../../auth'; // Import the sign-in Server Action
import { Button } from '@/components/ui/button'; // Assuming you have a standard button component

// A Server Component that renders a form for Google sign-in
export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-6">Welcome! Sign In to Continue</h1>
      
      <form
        // This form action is the core of the sign-in process.
        // It calls the signIn function as a Server Action.
        action={async () => {
          'use server';
          // Tell Auth.js to use the 'google' provider
          await signIn('google');
        }}
      >
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}
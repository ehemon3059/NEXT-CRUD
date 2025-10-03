// app/page.tsx
import { UserForm } from './components/user-form';
// 👈 Use the alias, assuming you configured it in tsconfig.json/jsconfig.json
//    If the file is at the root, '@/auth' is the correct alias.
import { auth } from '../../auth'; 
import AuthStatus from './components/auth-status'; 
import AuthButton from './components/auth-button'; 

export default async function Home() {
  // ✅ The 'auth()' function is correctly called here in a Server Component
  const session = await auth(); 

  return (
    <main className="flex min-h-screen flex-col items-center p-24 ">
      <h1 className="text-4xl font-extrabold mb-8">User Management Dashboard</h1>
      
      <AuthStatus />

      <AuthButton />

      {/* Show the form only if the user is authenticated */}
      {session?.user ? (
        <div className="w-full max-w-lg mt-8">
          <UserForm />
        </div>
      ) : (
        <p className="text-xl">Please sign in to manage users.</p>
      )}
    </main>
  );
}

// Optional: Add metadata for SEO
export const metadata = {
  title: "Dashboard | User Management",
  description: "Create a new user in the system",
};
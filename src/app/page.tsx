// app/page.tsx
import { UserForm } from './components/user-form';
// 👇 Use the Sonner Toaster


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 ">
      <UserForm /> 
 
  
    </main>
  );
}

// Optional: Add metadata for SEO
export const metadata = {
  title: "Create User | User Management",
  description: "Create a new user in the system",
};
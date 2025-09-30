// app/page.tsx
import { UserForm } from './components/user-form';
// 👇 Use the Sonner Toaster
import { Toaster } from '@/components/ui/sonner'; 

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 ">
      <UserForm /> 
      {/* 👇 The Toaster component from Sonner */}
      <Toaster /> 

      
    </main>
  );
}
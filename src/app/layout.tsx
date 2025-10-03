
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

   import { Toaster } from '@/components/ui/sonner';





import { SessionProvider } from 'next-auth/react'; // 👈 Import SessionProvider

// ... font definitions ...

export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <body>
           {/* Wrap the application in SessionProvider */}
           <SessionProvider> 
             {children}
           </SessionProvider>
           <Toaster position="top-center" />
         </body>
       </html>
     );
   }
// app/api/auth/[...nextauth]/route.ts
// This route handler sets up the essential API endpoints for NextAuth.js (v5)

// 👈 Import the handlers object from your core Auth.js configuration file
// The path assumes '@/auth' is an alias pointing to your root 'auth.ts' file.
import { handlers } from '../../../../../auth'; 

// Next.js App Router requires named exports for route handlers.
// The 'handlers' object contains the necessary GET and POST methods 
// derived from NextAuth(authConfig).
export const { GET, POST } = handlers;
// auth.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config'; // Ensure this path is correct relative to auth.ts

// 1. We extract the server-side functions (auth, signIn, signOut) 
//    and the route handlers (handlers) from the NextAuth initialization.
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// The 'auth' function exported here is what you import in your Server Components 
// via the '@/auth' alias.
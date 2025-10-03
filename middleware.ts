// middleware.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// The middleware uses the 'authorized' callback defined in auth.config.ts
export default NextAuth(authConfig).auth;

// You can configure which paths the middleware should run on.
// Here, we exclude Next.js internal files, static assets, and the API/Auth route itself.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|signin).*)'],
};
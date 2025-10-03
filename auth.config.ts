// auth.config.ts
import  { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './src/app/lib/prisma'; // Import your existing Prisma client

export const authConfig = {
  // 1. Configure the database adapter
  // This enables direct database interaction for Auth.js without an extra API layer.
  adapter: PrismaAdapter(prisma),

  // 2. Configure providers (Google in this case)
  providers: [
    Google({
      // Credentials pulled securely from .env.local via inferencing
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  // 3. Define custom sign-in page path
  pages: {
    signIn: '/signin', // Redirects unauthenticated users here
  },

  // 4. Callbacks (Optional but good for controlling session data)
  callbacks: {
    // Modify the session object returned to the client/server
    session: ({ session, user }) => {
      // Add the user's ID to the session object for easy access
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },

    // Enforce authentication on all requests handled by the middleware
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProtectedPath = !nextUrl.pathname.startsWith('/signin'); // Allow signin page

      // If they are not logged in and are on a protected path, redirect them to signin
      if (!isLoggedIn && isOnProtectedPath) {
        return Response.redirect(new URL('/signin', nextUrl));
      }

      // If they are logged in, allow them to proceed
      return true;
    },
  },

  // Use a JWT-based session strategy
  session: { strategy: 'jwt' },
} satisfies NextAuthConfig;
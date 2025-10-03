// auth.config.ts
import type { AuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './src/app/lib/prisma'; // Import your existing Prisma client

export const authConfig: AuthOptions = {
  // 1. Configure the database adapter
  // This enables direct database interaction for Auth.js without an extra API layer.
  adapter: PrismaAdapter(prisma),

  // 2. Configure providers (Google in this case)
  providers: [
    Google({
      // Credentials pulled securely from .env.local via inferencing
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  // 3. Define custom sign-in page path
  pages: {
    signIn: '/signin', // Redirects unauthenticated users here
  },

  // 4. Callbacks (Optional but good for controlling session data)
  callbacks: {
    // Modify the session object returned to the client/server
    session: ({ session, user }: { session: import("next-auth").Session; user: import("next-auth").User }) => {
      // Add the user's ID to the session object for easy access
      if (session.user) {
        (session.user as typeof session.user & { id?: string }).id = user.id;
      }
      return session;
    },

    // (Route protection should be implemented in middleware.ts, not here)
  },

  // Use a JWT-based session strategy
  session: { strategy: 'jwt' },
};
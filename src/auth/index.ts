import NextAuth from 'next-auth';
import { credentialsProvider } from './providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [credentialsProvider],
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  trustHost: true,
  callbacks: {
    async session({ session, token }) {
      // console.log({ loc: 'auth:callbacks:session', session, token });
      const tokenUser = token['user'] as
        | {
            id: string;
            email: string;
            name?: string | null;
            image?: string | null;
            emailVerified?: Date | null;
          }
        | undefined;

      if (tokenUser !== undefined) {
        session.user = {
          id: tokenUser.id,
          email: tokenUser.email,
          emailVerified: tokenUser.emailVerified ?? null,
          name: tokenUser.name ?? null,
          image: tokenUser.image ?? null,
        };
      }
      return session;
    },
    async jwt({ token, user, trigger }) {
      if (trigger === 'signIn' && user) {
        token['user'] = user;
      }
      return token;
    },
  },
});

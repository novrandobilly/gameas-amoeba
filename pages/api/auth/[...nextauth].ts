import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  secret: 'one_batch_two_batch_penny_and_dime',
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.userId = token.id;
        session.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const db = client.db();
        let foundId;
        if (credentials?.admin === 'true') {
          foundId = await db.collection('admins').findOne({ email: credentials?.email });
        } else {
          foundId = await db.collection('users').findOne({ email: credentials?.email });
        }
        if (!foundId) {
          client.close();
          throw new Error('Authentication Failed');
        }
        client.close();
        return { email: foundId.email, id: foundId._id.toString(), isAdmin: foundId.isAdmin || false };
      },

      // Add list of property you want to include here
      credentials: {
        email: { label: 'email', type: 'text' },
        admin: { label: 'admin' },
      },
    }),
  ],
});

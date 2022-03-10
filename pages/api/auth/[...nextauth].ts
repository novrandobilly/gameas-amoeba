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
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.userId = token.id;
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
        if (credentials?.admin) {
          foundId = await db.collection('admins').findOne({ email: credentials?.email });
        } else {
          foundId = await db.collection('users').findOne({ email: credentials?.email });
        }
        if (!foundId) {
          client.close();
          throw new Error('Authentication Failed');
        }
        client.close();
        return { email: foundId.email, id: foundId._id.toString() };
      },

      // Add list of property you want to include here
      credentials: {
        email: { label: 'email', type: 'text' },
        admin: { label: 'admin', type: 'boolean' },
      },
    }),
  ],
});

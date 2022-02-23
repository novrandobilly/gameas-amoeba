import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  secret: 'one_batch_two_batch_penny_and_dime',
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const db = client.db();
        const foundUser = await db.collection('users').findOne({ email: credentials?.email });
        if (!foundUser) {
          client.close();
          throw new Error('Authentication Failed');
        }
        client.close();
        return { email: foundUser.email };
      },
      credentials: {
        email: { label: 'email', type: 'text' },
      },
    }),
  ],
});

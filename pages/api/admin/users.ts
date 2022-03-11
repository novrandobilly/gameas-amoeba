import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';
import { getSession } from 'next-auth/react';

const usersHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const client = await connectToDatabase();
    const db = client.db();
    const session = await getSession({ req });
    console.log(session);
    let foundUsers;
    try {
      foundUsers = await db.collection('users').find({}).toArray();
      client.close();
      res.status(200).json(foundUsers);
    } catch (err) {
      client.close();
      res.status(500).json({ err });
    }
  }
};

export default usersHandler;

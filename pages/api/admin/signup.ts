import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

const AdminRegHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { name, email, passCode } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid Input' });
      return;
    }
    if (passCode !== 'gameas_infinity') {
      res.status(403).json({ message: 'You are not qualified to become an admin' });
    }

    const client = await connectToDatabase();
    const db = client.db();
    const existingAdmin = await db.collection('admins').findOne({ email });
    if (existingAdmin) {
      res.status(422).json({ message: 'Admin codename already registered.' });
      client.close();
      return;
    }

    let result;

    try {
      result = await db.collection('admins').insertOne({
        name,
        email,
        isAdmin: true,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        client.close();
        throw new Error(err.message);
      }
      console.log(err);
      client.close();
      throw new Error('Something went wrong');
    }

    client.close();
    res.status(201).json({ message: 'Admin registered!' });
  }
};

export default AdminRegHandler;

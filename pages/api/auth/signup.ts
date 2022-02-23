import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;

    const { name, email, gender, dateOfBirth, domicile, jobDesc, regional } = data;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid Input' });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      res.status(422).json({ message: 'Crew codename already registered.' });
      client.close();
      return;
    }

    let result;

    try {
      result = await db.collection('users').insertOne({
        name,
        email,
        gender,
        dateOfBirth,
        domicile,
        jobDesc,
        regional,
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

    res.status(201).json({ message: 'Crew registered!' });
    client.close();
  }
};

export default handler;

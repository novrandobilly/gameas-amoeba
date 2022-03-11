import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { answerResult, userData } = req.body;
    const client = await connectToDatabase();
    const db = client.db();

    try {
      const updateResult = await db.collection('users').updateOne(
        { email: userData.email, numerical: { $exists: false } },
        {
          $set: {
            numerical: {
              result: answerResult,
              testDate: new Date(),
            },
          },
        }
      );
      if (updateResult.matchedCount === 0) {
        client.close();
        res.status(400).json({ message: 'You have done the test' });
        return;
      }
    } catch (err) {
      client.close();
      if (err instanceof Error) {
        throw new Error(err.message);
      }
      throw new Error('Something went wrong');
    }
    client.close();
    res.status(200).json({ message: 'Successfully submit answer' });
  }
};

export default handler;

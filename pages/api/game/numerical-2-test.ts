import { Request, Response } from 'express';
import { connectToDatabase } from '../../../lib/db';

const Numerical2TestHandler = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const { answerResult, userData } = req.body;
    const client = await connectToDatabase();
    const db = client.db();

    try {
      const users = await db.collection('users');
      const updateResult = await users.updateOne(
        { email: userData?.email, numerical2: { $exists: false } },
        {
          $set: {
            numerical2: {
              result: { ...answerResult },
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

export default Numerical2TestHandler;

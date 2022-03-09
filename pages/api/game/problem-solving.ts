import { Request, Response } from 'express';
import { connectToDatabase } from '../../../lib/db';

const ProblemSolvingHandler = async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const { answerResult, userData } = req.body;
    const client = await connectToDatabase().catch((err) => {
      throw new Error('Cannot connect to Database');
    });
    const db = client.db();

    try {
      const users = await db.collection('users');
      const updatedResult = await users.updateOne(
        { email: userData?.email, problemSolving: { $exists: false } },
        {
          $set: {
            problemSolving: {
              result: { ...answerResult },
              testDate: new Date(),
            },
          },
        }
      );
      if (updatedResult.matchedCount === 0) {
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

export default ProblemSolvingHandler;

import { MongoClient } from 'mongodb';

export const connectToDatabase = async () => {
  let client;
  try {
    client = await MongoClient.connect(
      'mongodb+srv://novrandobilly:65m5bLT5VePeMy7E@cluster0.mfpqg.mongodb.net/gameas?retryWrites=true&w=majority'
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
      throw new Error(err.message);
    }
    console.log(err);
    throw new Error('Something went wrong');
  }

  return client;
};

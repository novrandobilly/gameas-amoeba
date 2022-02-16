import type { NextPage } from 'next';
import Head from 'next/head';

const Game: NextPage = () => {
  return (
    <div>
      <Head>
        <title>GameAs</title>
        <meta name='description' content='Game Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>GamePage</h1>
      </main>
    </div>
  );
};

export default Game;

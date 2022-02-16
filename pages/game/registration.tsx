import type { NextPage } from 'next';
import Head from 'next/head';

const Registration: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Registration</title>
        <meta name='description' content='Registration Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Registration Page (Nama, Usia, Gender)</h1>
      </main>
    </div>
  );
};

export default Registration;

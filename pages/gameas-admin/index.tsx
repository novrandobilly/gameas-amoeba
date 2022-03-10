import type { NextPage } from 'next';
import { useRef } from 'react';
import Head from 'next/head';

const GameAsAdmin: NextPage = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <Head>
        <title>GameAs Admin</title>
        <meta name='description' content='GameAs Admin Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>GameAs Admin Page </h1>

        <form>
          <div>
            <label htmlFor='admin-name'>Name</label>
            <input type='text' id='admin-name' ref={nameRef} />
          </div>
          <div>
            <label htmlFor='admin-email'>Email</label>
            <input type='text ' id='admin-email' />
          </div>
          <div>
            <label htmlFor='admin-passcode'>Pass Code</label>
            <input type='password' id='admin-passcode' />
          </div>
        </form>
      </main>
    </div>
  );
};

export default GameAsAdmin;

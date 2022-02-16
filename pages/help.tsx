import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout';

const Help: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Bantuan</title>
        <meta name='description' content='Bantuan &amp; FAQ' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>Bantuan</h1>
      </main>
    </Layout>
  );
};

export default Help;

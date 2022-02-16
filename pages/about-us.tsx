import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout';

const AboutUs: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About GameAs</title>
        <meta name='description' content='About GameAs Amoeba' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>About Us</h1>
      </main>
    </Layout>
  );
};

export default AboutUs;

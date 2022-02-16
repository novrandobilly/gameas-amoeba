import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>GameAs Amoeba</title>
        <meta name='description' content='Homepage GameAs Psychological Test' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to GameAs</h1>
      </main>
    </Layout>
  );
};

export default Home;

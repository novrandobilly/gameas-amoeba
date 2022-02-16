import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout';
import styles from './index.module.scss';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>GameAs Amoeba</title>
        <meta name='description' content='Homepage GameAs Psychological Test' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles['container']}>
        <h1 className={styles.title}>Welcome to GameAs</h1>
        <div className={styles['game-link']}>
          <Link href='/game'>Try Our Test</Link>
        </div>
      </main>
    </Layout>
  );
};

export default Home;

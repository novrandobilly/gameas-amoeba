import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout';
import Image from 'next/image';
import Logo from '../assets/logo.svg';
import Link from 'next/link';
import styles from './help.module.scss';

const Help: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Bantuan</title>
        <meta name='description' content='Bantuan &amp; FAQ' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles['help-content']}>
        <Image src={Logo} width={400} height={200} />
        <h1>FAQ & Kontak</h1>
        <Link href='/game'>Kembali</Link>
      </main>
    </Layout>
  );
};

export default Help;

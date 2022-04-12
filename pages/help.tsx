import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout';
import Image from 'next/image';
import Logo from '../assets/logo.png';
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
        <Image alt='Logo' src={Logo} width={500} height={150} />
        <h1>FAQ &amp; Kontak</h1>
        <Link href='/game'>Kembali</Link>
      </main>
    </Layout>
  );
};

export default Help;

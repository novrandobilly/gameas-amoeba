import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/layout';
import Ijal from '../assets/about-us/Rizal_Fadhli.jpg';
import Akbar from '../assets/about-us/Akbar_Rizaldi.png';
import Yabes from '../assets/about-us/Yabes_Nugroho.jpg';
import Envien from '../assets/about-us/Envien-Black.png';

import styles from './about-us.module.scss';

const AboutUs: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About GameAs</title>
        <meta name='description' content='About GameAs Amoeba' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles['container']}>
        <section className={styles['founders-container']}>
          <h1 className={styles['title']}>The Founders</h1>
          <div className={styles['founders']}>
            <div className={styles['founder']}>
              <Image src={Ijal} width={300} height={300} alt='Founder' />
              <h1 className={styles['name']}>Rizal Fadhli</h1>
              <p className={styles['description']}>Hustler</p>
            </div>
            <div className={styles['founder']}>
              <Image src={Akbar} width={300} height={300} alt='Founder' />
              <h1 className={styles['name']}>Akbar Rizaldi</h1>
              <p className={styles['description']}>Hipster</p>
            </div>
            <div className={styles['founder']}>
              <Image src={Yabes} width={300} height={300} alt='Founder' />
              <h1 className={styles['name']}>Yabes Nugroho</h1>
              <p className={styles['description']}>Hacker</p>
            </div>
          </div>
        </section>

        <section className={styles['our-partners-container']}>
          <h1 className={styles['title']}>Our Partner</h1>
          <div className={styles['partner']}>
            <Image src={Envien} width={350} height={75} alt='Partner' />
            <div className={styles['partner-text']}>
              <h2>Envien Studio</h2>
              <p>Web Consultant &amp; UX Designer</p>
              <a href='https://envienstudio.com' target='_blank' rel='noreferrer'>
                envienstudio.com
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default AboutUs;

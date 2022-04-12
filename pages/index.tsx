import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/layout';
import BG1 from '../assets/landing-page/bg1.png';
import BG2 from '../assets/landing-page/bg2.png';
import BG3 from '../assets/landing-page/bg3.png';
import styles from './index.module.scss';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>GameAs Amoeba</title>
        <meta name='description' content='Homepage GameAs Psychological Test' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles['container']}>
        <section className={styles['section-1']}>
          <Image src={BG1} className={styles['background']} layout='fill' alt='background' objectFit='cover' />
          <div className={styles['text-content']}>
            <h1>We Want to Help You Find the Right Talent</h1>
            <p>
              We are developing a game-based assessment tool that will help you find candidates who fit perfectly with
              your company
            </p>
            <div className={styles['game-link']}>
              <Link href='/game'>Try Our Test</Link>
            </div>
          </div>
        </section>
        <section className={styles['section-2']}>
          <Image src={BG2} className={styles['background']} layout='fill' alt='background' objectFit='contain' />
          <div className={styles['text-content']}>
            <h1>Potentially More Engaging and Less Stressful Experience for Candidates</h1>
          </div>
        </section>
        <section className={styles['section-3']}>
          <Image src={BG3} className={styles['background']} layout='fill' alt='background' objectFit='cover' />
          <div className={styles['text-content']}>
            <h1>Improving Recruitment Experience</h1>
            <p>
              Measure candidates’ cognitive ability and personality ability through an engaging game-based assessment
            </p>
            <div className={styles['game-link']}>
              <Link href='/game'>Try Our Test</Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;

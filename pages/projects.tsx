import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/layout';
import WorkInProgress from '../assets/our-projects/WorkInProgress.png';
import Stationary from '../assets/our-projects/Stationary.png';

import styles from './projects.module.scss';

const OurProjects: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Our Projects</title>
        <meta name='description' content='Our Projects Amoeba' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles['container']}>
        <section className={styles['project']}>
          <Image alt='Work In Progress' src={WorkInProgress} width={500} height={500} />
          <div className={styles['project-text']}>
            <h2>A Work In Progress</h2>
            <p>
              This is an innovation project that we do alongside our normal day-to-day works. We are currently
              developing game-based cognitive ability and personality assessment that we believe will improve employee
              experience.
            </p>
          </div>
        </section>
        <section className={styles['project']}>
          <Image alt='Stationary' src={Stationary} width={500} height={500} />
          <div className={styles['project-text']}>
            <h2>A Scientific Effort</h2>
            <p>
              We will also make sure that our method is valid and reliable. We want it to be more than just a game. So
              far, Findings from both academic and practical fields provide promising supports for game-based
              assessment.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default OurProjects;

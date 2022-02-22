import type { NextPage } from 'next';
import Head from 'next/head';
import styles from './index.module.scss';
import Image from 'next/image';
import Logo from '../../assets/logo.svg';
import Link from 'next/link';

const Game: NextPage = () => {
  return (
    <div className={styles['container']}>
      <Head>
        <title>GameAs</title>
        <meta name='description' content='Game Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles['menu']}>
        <Link href='/'>
          <div className={styles['logo']}>
            <Image src={Logo} width={300} height={150} />
          </div>
        </Link>
        <Link href='/game/registration'>
          <button className={styles['register-button']}>Daftar</button>
        </Link>
        <form className={styles['login-form']}>
          <h3>Sudah terdaftar?</h3>
          <div className={styles['login-input']}>
            <input type='text' placeholder='Silahkan input username anda' />
            <button className={styles['login-button']}>Scan ID</button>
          </div>
        </form>
        <Link href='/game/numerical-intro'>
          <button className={styles['numerical-button']}>Game I: Numerical Ability</button>
        </Link>
        <Link href='/game/problem-solving'>
          <button className={styles['problem-solving-button']}>Game II: Problem Solving</button>
        </Link>
        <Link href='/result/id-sembarang'>
          <button className={styles['result-button']}>Hasil Test</button>
        </Link>
        <Link href='/help'>
          <button className={styles['help-button']}>Bantuan</button>
        </Link>
      </div>
    </div>
  );
};

export default Game;

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
        <button className={styles['register-button']}>Daftar</button>
        <form className={styles['login-form']}>
          <h3>Sudah terdaftar?</h3>
          <div className={styles['login-input']}>
            <input type='text' placeholder='Silahkan input username anda' />
            <button className={styles['login-button']}>Scan ID</button>
          </div>
        </form>
        <button className={styles['numerical-button']}>
          <Link href='/game/numerical'>Game I: Numerical Ability</Link>
        </button>
        <button className={styles['problem-solving-button']}>
          <Link href='/game/problem-solving'>Game II: Problem Solving</Link>
        </button>
        <button className={styles['result-button']}>
          <Link href='/result/id-sembarang'>Hasil Test</Link>
        </button>
        <button className={styles['help-button']}>
          <Link href='/help'>Bantuan</Link>
        </button>
      </div>
    </div>
  );
};

export default Game;

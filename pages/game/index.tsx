import type { NextPage } from 'next';
import { ChangeEvent, FormEvent, Fragment, MouseEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import Head from 'next/head';
import styles from './index.module.scss';
import Image from 'next/image';
import Logo from '../../assets/logo.svg';
import Link from 'next/link';

const Game: NextPage = () => {
  const { data: session, status } = useSession();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [codename, setCodename] = useState<string>('');
  const onCodenameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const codenameValue = event.target.value;
    setCodename(codenameValue);
  };
  const onLoginHandler = async (event: FormEvent) => {
    event.preventDefault();
    setLoginLoading(true);
    const result = await signIn('credentials', { redirect: false, email: codename, admin: false });
    setCodename('');
    console.log(result);
    setLoginLoading(false);
  };
  const onLogoutHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut({ redirect: false });
  };

  return (
    <div className={styles['container']}>
      <Head>
        <title>GameAs</title>
        <meta name='description' content='Game Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className={styles['menu']}>
        <Link passHref href='/'>
          <div className={styles['logo']}>
            <Image alt='Logo' src={Logo} width={300} height={150} />
          </div>
        </Link>

        {status !== 'authenticated' && (
          <Fragment>
            <Link passHref href='/game/registration'>
              <button className={styles['register-button']}>Daftar</button>
            </Link>
            <form className={styles['login-form']} onSubmit={onLoginHandler}>
              <h3>Sudah terdaftar?</h3>
              <div className={styles['login-input']}>
                <input
                  type='text'
                  placeholder='Silahkan input username anda'
                  value={codename}
                  onChange={onCodenameHandler}
                />
                <button type='submit' className={styles['login-button']}>
                  Scan ID
                </button>
                {loginLoading && <span>Loading...</span>}
              </div>
            </form>
          </Fragment>
        )}
        <Link passHref href='/game/numerical-intro'>
          <button disabled={status !== 'authenticated'} className={styles['numerical-button']}>
            Game I: Save The Plants!
          </button>
        </Link>
        <Link passHref href='/game/problem-solving-test'>
          {/* <button disabled={status !== 'authenticated'} className={styles['problem-solving-button']}> */}
          <button disabled={true} className={styles['problem-solving-button']}>
            Game II: Recognize Em!
          </button>
        </Link>
        <Link passHref href='/game/numerical-2-intro'>
          <button disabled={status !== 'authenticated'} className={styles['numerical-2-button']}>
            Game III: Quality Check
          </button>
        </Link>
        {status === 'authenticated' && (
          <Link passHref href={`/result/${session?.userId}`}>
            <button className={styles['result-button']}>Hasil Test</button>
          </Link>
        )}
        <Link passHref href='/help'>
          <button className={styles['help-button']}>Bantuan</button>
        </Link>
        {status === 'authenticated' && (
          <button className={styles['help-button']} onClick={onLogoutHandler}>
            Keluar
          </button>
        )}
      </div>
    </div>
  );
};

export default Game;

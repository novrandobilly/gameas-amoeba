import type { NextPage } from 'next';
import { FormEvent, useRef, useState, MouseEvent, Fragment } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import styles from './index.module.scss';

const GameAsAdmin: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passCodeRef = useRef<HTMLInputElement>(null);
  const emailSignInRef = useRef<HTMLInputElement>(null);

  const onRegisterHandler = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (passCodeRef.current?.value !== 'gameas_infinity') {
      setIsLoading(false);
      return;
    }
    const payload = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      passCode: passCodeRef.current?.value,
    };

    fetch('/api/admin/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((resJSON) => {
        console.log(resJSON);
        setIsLoading(false);
        signIn('credentials', { redirect: false, email: emailRef.current?.value, admin: true }).then(() => {
          router.push('/gameas-admin/dashboard');
        });
      })
      .catch((err) => {
        setIsLoading(false);
        if (err instanceof Error) {
          throw new Error(err.message);
        } else {
          throw new Error('Something went wrong');
        }
      });
  };

  const onSignInHandler = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    signIn('credentials', { redirect: false, email: emailSignInRef.current?.value, admin: true }).then((res: any) => {
      if (!res?.error) {
        setIsLoading(false);
        router.push('/gameas-admin/dashboard');
      }
      setIsLoading(false);
    });
  };

  const onSignOutHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    signOut({ redirect: false });
  };

  return (
    <div className={styles['container']}>
      <Head>
        <title>GameAs Admin</title>
        <meta name='description' content='GameAs Admin Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles['authentication-module']}>
        {status === 'authenticated' && <h1>Done your mission, General? </h1>}
        {status !== 'authenticated' && <h1>State your identity, General! </h1>}

        {status !== 'authenticated' && (
          <Fragment>
            <div className={styles['registration-container']}>
              <h2>New General, please report your identity here!</h2>
              <form className={styles['registration-form']} onSubmit={onRegisterHandler}>
                <div className={styles['input-container']}>
                  <label htmlFor='admin-name'>Name</label>
                  <input type='text' id='admin-name' ref={nameRef} />
                </div>
                <div className={styles['input-container']}>
                  <label htmlFor='admin-email'>Email</label>
                  <input type='text ' id='admin-email' ref={emailRef} />
                </div>
                <div className={styles['input-container']}>
                  <label htmlFor='admin-passcode'>Pass Code</label>
                  <input type='password' id='admin-passcode' ref={passCodeRef} />
                </div>
                <button>Register</button>
              </form>
            </div>

            <div className={styles['signin-container']}>
              <h2>Existing General? Simply state your identification here</h2>
              <form onSubmit={onSignInHandler} className={styles['signin-form']}>
                <div className={styles['input-container']}>
                  <label htmlFor='admin-email-signin'>Email</label>
                  <input type='text' id='admin-email-signin' ref={emailSignInRef} />
                </div>
                <button>Sign In</button>
              </form>
            </div>
          </Fragment>
        )}
        <div className={styles['scanner']}></div>

        {status === 'authenticated' && (
          <Fragment>
            <div className={styles['to-dashboard']}>
              <Link href='/gameas-admin/dashboard'>To Dashboard</Link>
            </div>
            <button onClick={onSignOutHandler} className={styles['signout']}>
              Sign Out
            </button>
          </Fragment>
        )}
      </main>
    </div>
  );
};

export default GameAsAdmin;

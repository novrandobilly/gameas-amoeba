import type { NextPage } from 'next';
import { useState, ChangeEvent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Male from '../../assets/male.svg';
import Female from '../../assets/female.svg';

import styles from './registration.module.scss';

type identityType = {
  name: string;
  email: string;
};

type additionalDataType = {
  dateOfBirth: string;
  jobDesc: string;
  regional: string;
  domicile: string;
};

type payloadType = {
  name: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  jobDesc: string;
  regional: string;
  domicile: string;
};

const Registration: NextPage = () => {
  const router = useRouter();
  const [identity, setIdentity] = useState<identityType>({ name: '', email: '' });
  const [phase, setPhase] = useState<number>(1);
  const [isMale, setIsMale] = useState<boolean>(true);
  const [additional, setAdditional] = useState<additionalDataType>({
    dateOfBirth: '',
    jobDesc: '',
    regional: '',
    domicile: '',
  });

  const onIdentityChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const inputId = event.target.id;

    if (inputId === 'soldierName') {
      setIdentity((prevState) => {
        const newState = {
          ...prevState,
          name: inputValue,
        };
        return newState;
      });
    }

    if (inputId === 'soldierCodeName') {
      setIdentity((prevState) => {
        const newState = {
          ...prevState,
          email: inputValue,
        };
        return newState;
      });
    }
  };
  const onGenderHandler = (gender: boolean) => {
    setIsMale(gender);
    setPhase(3);
  };

  const onAdditionalHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const valueKey = event.target.id;

    const inputValue = {
      [valueKey]: newValue,
    };
    setAdditional((prevState) => {
      return {
        ...prevState,
        ...inputValue,
      };
    });
  };

  const onSubmitHandler: () => void = () => {
    const payload: payloadType = {
      name: identity.name,
      email: identity.email,
      gender: isMale ? 'pria' : 'wanita',
      dateOfBirth: additional.dateOfBirth,
      domicile: additional.domicile,
      jobDesc: additional.jobDesc,
      regional: additional.regional,
    };

    fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((resJSON) => {
        console.log(resJSON);
        signIn('credentials', { redirect: false, email: identity.email }).then(() => {
          router.push('/game');
        });
      })
      .catch((err) => {
        if (err instanceof Error) {
          throw new Error(err.message);
        } else {
          throw new Error('Something went wrong');
        }
      });
  };

  const phase1 = (
    <div className={styles['name-container']}>
      <p>Anggota baru Recon Corps melapor, nama saya</p>
      <input
        type='text'
        placeholder='Nama anda'
        id='soldierName'
        value={identity.name}
        onChange={onIdentityChangeHandler}
      />
      <p>dengan kode identitas</p>
      <input
        type='text'
        placeholder='Email anda'
        id='soldierCodeName'
        value={identity.email}
        onChange={onIdentityChangeHandler}
      />
      <p>telah memahami seluruh protokol ruang angkasa dan siap bertugas!</p>
      <button className={styles['reg-button']} onClick={() => setPhase(2)}>
        &gt;&gt;
      </button>
    </div>
  );

  const phase2 = (
    <div className={styles['gender-container']}>
      <h1>Pilih Gender Karakter Anda!</h1>
      <div className={styles['gender-option']}>
        <div className={`${styles['gender']} ${styles['male']}`} onClick={onGenderHandler.bind(null, true)}>
          <Image src={Male} width={300} height={300} />
          <h1>Pria</h1>
        </div>
        <div className={`${styles['gender']} ${styles['female']}`} onClick={onGenderHandler.bind(null, false)}>
          <Image src={Female} width={300} height={300} />
          <h1>Wanita</h1>
        </div>
      </div>
    </div>
  );

  const phase3 = (
    <div className={styles['additional-data-container']}>
      <h1>Prajurit, silahkan lengkapi data dirimu!</h1>
      <div className={styles['additional-data-input']}>
        <label htmlFor='dateOfBirth'>Tanggal Lahir</label>
        <input type='date' id='dateOfBirth' value={additional.dateOfBirth} onChange={onAdditionalHandler} />
      </div>
      <div className={styles['additional-data-input']}>
        <label htmlFor='jobDesc'>Jobdesc</label>
        <input type='text' id='jobDesc' value={additional.jobDesc} onChange={onAdditionalHandler} />
      </div>
      <div className={styles['additional-data-input']}>
        <label htmlFor='domicile'>Domisili</label>
        <input type='text' id='domicile' value={additional.domicile} onChange={onAdditionalHandler} />
      </div>
      <div className={styles['additional-data-input']}>
        <label htmlFor='regional'>Regional Telkom</label>
        <input type='text' id='regional' value={additional.regional} onChange={onAdditionalHandler} />
      </div>
      <button className={styles['reg-button']} onClick={() => setPhase(4)}>
        &gt;&gt;
      </button>
    </div>
  );

  const phase4 = (
    <div className={styles['summary']}>
      <div className={styles['biodata-summary']}>
        <div className={styles['main-biodata']}>
          <h1>Selamat Datang,</h1>
          <h2>
            <span className={styles['user-biodata']}>{identity.name}</span>!
          </h2>
          <p>
            codename:{' '}
            <em>
              <span className={styles['user-biodata']}>{identity.email}</span>
            </em>
          </p>
        </div>
        <p>
          Jenis Kelamin: <span className={styles['user-biodata']}>{isMale ? 'Pria' : 'Wanita'}</span>
        </p>
        <p>
          Tanggal Lahir: <span className={styles['user-biodata']}>{additional.dateOfBirth}</span>
        </p>
        <p>
          Domisili: <span className={styles['user-biodata']}>{additional.domicile}</span>
        </p>
        <p>
          Jobdesc: <span className={styles['user-biodata']}>{additional.jobDesc}</span>
        </p>
        <p>
          Regional Telkom: <span className={styles['user-biodata']}>{additional.regional}</span>
        </p>

        <div className={styles['button-container']}>
          <button className={styles['submit-button']} onClick={onSubmitHandler}>
            Oke! Data yang ditampilkan adalah benar!
          </button>
          <button className={styles['edit-button']} onClick={() => setPhase(1)}>
            Ini bukan saya. Ubah data!
          </button>
        </div>
      </div>
      <div className={styles['information-summary']}>
        <div className={styles['image-scanning']}>
          <div className={styles['scan-line']}></div>
        </div>
        <p>
          Harap periksa kembali data dengan seksama, ya! Jika data yang ditampikan sudah sesuai, anda bisa lanjut ke
          step selanjutnya!
        </p>
      </div>
    </div>
  );

  return (
    <div className={styles['container']}>
      <Head>
        <title>Registration</title>
        <meta name='description' content='Registration Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {phase === 1 ? phase1 : phase === 2 ? phase2 : phase === 3 ? phase3 : phase === 4 ? phase4 : phase1}
    </div>
  );
};

export default Registration;

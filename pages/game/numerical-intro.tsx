import { useState, useEffect, FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import type { NextPage } from 'next';
import ProctorImage from '../../assets/Proctoring.png';
import SteerImage from '../../assets/Steering.png';

import styles from './numerical-intro.module.scss';

export interface NumericProps {
  nama: string;
}

export interface IntroProps {
  proctorImage: any;
  addCounter: () => void;
}

export interface TextProps {
  text: string;
}

export interface explanationProps {
  explanationText: string;
}

const Proctor: FC<IntroProps> = (props) => {
  const { proctorImage, addCounter } = props;
  return (
    <div className={`${styles['proctorContainer']}`}>
      <Image
        src={proctorImage}
        alt='proctor'
        width={650}
        height={420}
        layout='fixed'
      />

      <p className={`${styles['proctorText']}`}>
        Scan wajah untuk mengakses ruang kendali
      </p>
      <button className={`${styles['submit']}`} onClick={() => addCounter()}>
        Submit
      </button>
    </div>
  );
};

const Story: FC<TextProps> = (props) => {
  const { text } = props;
  return (
    <div className={`${styles['storyContainer']}`}>
      <p className={`${styles['storyText']}`}>{text}</p>
    </div>
  );
};

const Guide = () => {
  return (
    <div className={`${styles['guideContainer']}`}>
      <div className={`${styles['guideScreen']}`} />
      <div className={`${styles['guideScreen']}`} />
    </div>
  );
};

const Steer = () => {
  return (
    <div className={`${styles['steerContainer']}`}>
      <div className={`${styles['shapeWraper']}`}>
        <div className={`${styles['oval']}`}></div>
        <div className={`${styles['ovalShadow']}`}></div>

        <Image
          src={SteerImage}
          alt='Steering-wheel'
          width={1000}
          height={200}
          layout='fixed'
        />
        <div className={`${styles['selectorWrapper']}`}>
          <div className={`${styles['triangleLeft']}`}></div>
          <div className={`${styles['triangleRight']}`}></div>
        </div>
        <div className={`${styles['shadowWrapper']}`}>
          <div className={`${styles['triangleLeftShadow']}`}></div>
          <div className={`${styles['triangleRightShadow']}`}></div>
        </div>
      </div>
    </div>
  );
};

const Explaination: FC<TextProps> = (props) => {
  const { text } = props;
  return (
    <div className={`${styles['explainContainer']}`}>
      <p className={`${styles['explainText']}`}>{text}</p>
    </div>
  );
};

const NumericalIntro: FC<NumericProps> = (props) => {
  const { nama } = props;

  const [renderBackground, setRenderBackground] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const [story] = useState([
    { id: 1, text: `hi ${nama}, selamat datang di ruang kendali!` },
    { id: 2, text: `Kabar buruk!! Kita memasuki sabuk asteroid!` },
    {
      id: 3,
      text: `Fungsi otomatis untuk menghindari asteroid sedang tidak berfungsi!`,
    },
    {
      id: 4,
      text: `Kita harus mengemudikan pesawat secara manual, menggunakan sistem deteksi asteroid`,
    },
    { id: 5, text: `Berdasarkan informasi dari sistem deteksi asteroid` },
    {
      id: 6,
      text: `Kita harus menghindari titik dengan jumlah asteroid yang lebih banyak!`,
    },
    { id: 7, text: `Terdapat 2 layar kiri dan kanan` },
    {
      id: 8,
      text: `Tekan tombol kanan apabila meteor di layar kanan lebih sedikit`,
    },
    {
      id: 9,
      text: `Tekan tombol kiri apabila meteor di layar kiri lebih sedikit`,
    },
    {
      id: 10,
      text: `Tentukan jumlah sesuai dengan operasi +, -, x, : yang ditunjukkan pada indikator ini!`,
    },
    {
      id: 11,
      text: `Mohon membaca instruksi secara teliti! anda tidak dapat kembali ke panel ini setelah menekan tombol mulai!`,
    },
  ]);

  useEffect(() => {
    if (counter >= 2) {
      setRenderBackground('control');
    }
    if (counter > 3) {
      setRenderBackground('mission');
    }
    if (counter <= 0) {
      setRenderBackground('enterance');
    }
  }, [counter]);

  useEffect(() => {
    if (counter === 1) {
      setVisible(true);
      setRenderBackground('enterance');
    } else {
      setVisible(false);
    }
  }, [counter]);

  const addCounter = () => {
    setCounter(counter + 1);
  };

  const substractCounter = () => {
    setCounter(counter - 1);
  };

  return (
    <div className={`${styles['container']} ${styles[`${renderBackground}`]}`}>
      <Head>
        <title>Numerical Ability Intro</title>
        <meta name='description' content='Numerical Ability Intro Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className={`${styles['missionContainer']}`}>
          {visible ? (
            <Proctor
              proctorImage={ProctorImage}
              addCounter={() => addCounter()}
            />
          ) : (
            <div className={`${styles['buttonWraper']}`}>
              <button
                className={`${styles['button']}`}
                onClick={() => substractCounter()}
                disabled={counter <= 0}
              >
                {'<'}
              </button>

              <button
                className={`${styles['button']}`}
                onClick={() => addCounter()}
                disabled={counter >= 13}
              >
                {'>'}
              </button>
            </div>
          )}

          {counter >= 3 && counter <= 9 && (
            <Story text={story[counter - 3].text} />
          )}

          {counter >= 9 && (
            <>
              <Guide /> <Steer />
            </>
          )}

          {counter >= 10 && counter <= 13 && (
            <>
              <Explaination text={story[counter - 3].text} />
              <div
                className={
                  counter === 10
                    ? `${styles['lineHelperLeft']}`
                    : counter === 11
                    ? `${styles['lineHelperRight']}`
                    : counter === 12
                    ? `${styles['lineHelperMid']}`
                    : `${styles['dummy']}`
                }
              />
            </>
          )}

          {counter === 13 && (
            <button className={`${styles['startButton']}`}>
              <Link href='/game/numerical-test'>Mulai</Link>
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default NumericalIntro;

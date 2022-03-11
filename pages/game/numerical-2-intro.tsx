import { NextPage } from 'next';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import Head from 'next/head';
import styles from './numerical-2-intro.module.scss';
import Image from 'next/image';
import Explorer from '../../assets/numerical-test-2/explorer.png';
import LandingModule from '../../assets/numerical-test-2/landing-module.png';
import ThumbsUp from '../../assets/numerical-test-2/thumbs_up.png';
import ThumbsDown from '../../assets/numerical-test-2/thumbs_down.png';
import Equal from '../../assets/numerical-test-2/equal.png';

const Numerical2Intro: NextPage = () => {
  const [phase, setPhase] = useState<number>(1);
  const [upFeedback, setUpFeedback] = useState<string>('');
  const [equalFeedback, setEqualFeedback] = useState<string>('');
  const [downFeedback, setDownFeedback] = useState<string>('');

  const onClickUpHandler = () => {
    if (phase === 11) {
      setUpFeedback(styles['correct-feedback']);
      setTimeout(() => {
        setUpFeedback('');
        setPhase((prevState) => prevState + 1);
      }, 1000);
    }
  };
  const onClickEqualHandler = () => {};
  const onClickDownHandler = () => {
    if (phase === 12) {
      setDownFeedback(styles['correct-feedback']);
      setTimeout(() => {
        setDownFeedback('');
        setPhase((prevState) => prevState + 1);
      }, 1000);
    }
  };

  return (
    <Fragment>
      <Head>
        <title>Quality Check</title>
        <meta name='description' content='Quality Check Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles['container']}>
        {phase <= 3 && (
          <div className={styles['intro']}>
            <div className={styles['intro-text']}>
              {phase === 1 && (
                <p>
                  Guncangan yang dialami mungkin telah menyebabkan beberapa peralatan yang kita miliki mengalami
                  kerusakan.
                </p>
              )}
              {phase === 2 && (
                <p>
                  Kita akan melakukan <em> “Quality Check”</em> untuk menentukan apakah peralatan tersebut masih
                  memenuhi standar.
                </p>
              )}
              {phase === 3 && <p>Peralatan tersebut perlu diperbaiki apabila sudah tidak memenuhi standar.</p>}
            </div>
            <button className={styles['next-button']} onClick={() => setPhase((prevState) => prevState + 1)}>
              GO
            </button>
          </div>
        )}

        {phase >= 4 && (
          <div className={styles['example']}>
            <div className={styles['problem-container']}>
              <div className={styles['condition']}>
                <p>Kondisi</p>
                {phase >= 5 && phase < 12 && (
                  <Fragment>
                    <div className={`${styles['bubble']} ${styles['ex-3']}`}>3</div>
                    <div className={`${styles['bubble']} ${styles['ex-4']}`}>4</div>
                    <div className={`${styles['bubble']} ${styles['ex-7']}`}>7</div>
                  </Fragment>
                )}
                {phase >= 12 && (
                  <Fragment>
                    <div className={`${styles['bubble']} ${styles['ex-2a-2']}`}>2</div>
                    <div className={`${styles['bubble']} ${styles['ex-2a-6']}`}>6</div>
                    <div className={`${styles['bubble']} ${styles['ex-2a-8']}`}>8</div>
                    <div className={`${styles['bubble']} ${styles['ex-2a-1']}`}>1</div>
                  </Fragment>
                )}
              </div>
              <div className={styles['standard']}>
                <p>Standard</p>
                {phase >= 5 && phase < 12 && (
                  <Fragment>
                    <div className={`${styles['bubble']} ${styles['ex-1']}`}>1</div>
                    <div className={`${styles['bubble']} ${styles['ex-5']}`}>5</div>
                    <div className={`${styles['bubble']} ${styles['ex-2']}`}>2</div>
                  </Fragment>
                )}
                {phase >= 12 && (
                  <Fragment>
                    <div className={`${styles['bubble']} ${styles['ex-2b-2']}`}>2</div>
                    <div className={`${styles['bubble']} ${styles['ex-2b-1']}`}>1</div>
                    <div className={`${styles['bubble']} ${styles['ex-2b-10']}`}>10</div>
                    <div className={`${styles['bubble']} ${styles['ex-2b-5']}`}>5</div>
                  </Fragment>
                )}
              </div>
              <div className={styles['tools']}>
                {phase <= 4 && <p>Pada kolom ini akan ditampilkan alat yang akan kita periksa</p>}
                {phase >= 5 && (
                  <Fragment>
                    <Image alt='Image Example' src={phase >= 12 ? LandingModule : Explorer} width={300} height={200} />
                    <p>{phase >= 12 ? 'Landing Module' : 'Explorer'}</p>
                  </Fragment>
                )}
              </div>
            </div>
            {phase < 8 && (
              <div className={styles['instruction-container']}>
                {phase === 5 && <p>Pada kolom “KONDISI” dan “STANDAR” akan ditampilkan angka - angka</p>}
                {phase === 6 && (
                  <p>
                    Angka - angka tersebut merepresentasikan indikator - indikator penilaian dari alat yang akan
                    diperiksa
                  </p>
                )}
                {phase === 7 && <p>Jumlahkan angka - angka pada kolom “KONDISI” dan “STANDAR”</p>}

                <button className={styles['next-button']} onClick={() => setPhase((prevState) => prevState + 1)}>
                  GO
                </button>
              </div>
            )}
            {phase >= 8 && (
              <div className={styles['options-container']}>
                <div className={styles['options-navigation']}>
                  {phase === 8 && (
                    <p>
                      Pilih <em>thumbs up</em> apabila jumlah angka dalam kolom “KONDISI” LEBIH BESAR dari jumlah angka
                      dalam kolom “STANDARD”
                    </p>
                  )}
                  {phase === 9 && (
                    <p>
                      Pilih <em>thumbs down</em> apabila jumlah angka dalam kolom “KONDISI” LEBIH KECIL dari jumlah
                      angka dalam kolom “STANDAR”
                    </p>
                  )}
                  {phase === 10 && (
                    <p>
                      Pilih <em>sama dengan</em> apabila jumlah angka dalam kolom “KONDISI” SAMA DENGAN dari jumlah
                      angka dalam kolom “STANDAR”
                    </p>
                  )}
                  {phase === 11 && <p>Mari kita coba berlatih terlebih dahulu. Pilihlah jawaban yang tepat!</p>}
                  {phase === 12 && <p>Ayo kita coba berlatih satu kali lagi</p>}
                  {phase === 13 && <p>Klik “Mulai” apabila Anda sudah siap</p>}
                  {phase < 13 && (
                    <Fragment>
                      <div className={`${styles['option-button']} ${upFeedback}`} onClick={onClickUpHandler}>
                        <Image alt='Thumbs Up' src={ThumbsUp} width={150} height={100} />
                      </div>
                      <div className={`${styles['option-button']} ${equalFeedback}`} onClick={onClickEqualHandler}>
                        <Image alt='Equal' src={Equal} width={150} height={100} />
                      </div>
                      <div className={`${styles['option-button']} ${downFeedback}`} onClick={onClickDownHandler}>
                        <Image alt='Thumbs Down' src={ThumbsDown} width={150} height={100} />
                      </div>
                    </Fragment>
                  )}
                  {phase === 13 && (
                    <Fragment>
                      <div className={styles['repeat']} onClick={() => setPhase(1)}>
                        Ulangi Instruksi
                      </div>
                      <Link passHref href='/game/numerical-2-test'>
                        <div className={styles['start']}>Mulai</div>
                      </Link>
                    </Fragment>
                  )}
                </div>
                {phase < 11 && (
                  <button className={styles['next-button']} onClick={() => setPhase((prevState) => prevState + 1)}>
                    GO
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </Fragment>
  );
};

export default Numerical2Intro;

import { NextPage } from 'next';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import Example from '../../components/problem-solving-example/example';
import BG from '../../assets/problem-solving/bg.png';
import Robot from '../../assets/problem-solving/robot.png';
import RobotHead from '../../assets/problem-solving/robot-head.png';
import NextBtn from '../../assets/problem-solving/right.png';
import ProblemExample from '../../assets/problem-solving/example_2x2/main.jpeg';
import Chunk1 from '../../assets/problem-solving/example_2x2/chunk_1.png';
import Chunk2 from '../../assets/problem-solving/example_2x2/chunk_2.png';
import Chunk3 from '../../assets/problem-solving/example_2x2/chunk_3.png';
import Chunk4 from '../../assets/problem-solving/example_2x2/chunk_4.png';
import Screen from '../../assets/numerical-test-2/standard-condition-container.png';
import styles from './problem-solving-intro.module.scss';

const ProblemSolvingIntro: NextPage = () => {
  const [phase, setPhase] = useState<number>(7);

  let introWording: string = 'Ini adalah RF-23, robot asisten yang membantu kita menyelesaikan pekerjaan kita di sini.';

  switch (phase) {
    case 0:
      introWording = 'Ini adalah RF-23, robot asisten yang membantu kita menyelesaikan pekerjaan kita di sini.';
      break;
    case 1:
      introWording = 'Robot ini memang tidak sempurna, tapi dia sangat membantu.';
      break;
    case 2:
      introWording = 'Sepertinya guncangan yang kita alami tadi telah mengganggu fungsi image recognition-nya.';
      break;
    case 3:
      introWording = 'Perlu penyesuaian kembali agar fungsi image recognition bekerja seperti sebelumnya.';
      break;
    case 4:
      introWording = '';
      break;
    case 5:
      introWording = 'Pada kolom ini akan ditampilkan potongan - potongan object dari kolom “GAMBAR”';
      break;

    default:
      introWording = '';
  }

  return (
    <div className={styles['container']}>
      <Head>
        <title>Recognize Em! Introduction</title>
        <meta name='description' content='Recognize Em! Introduction Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Image alt='Background' className={styles['background-image']} src={BG} layout='fill' objectFit='cover' />
      {phase <= 3 && (
        <Fragment>
          <div className={styles['robot']}>
            <Image alt='Robot' src={Robot} width={250} height={500} />
          </div>

          <div className={styles['instruction']}>
            <p>{introWording}</p>
            <button onClick={() => setPhase((prev) => prev + 1)}>
              <Image alt='next' src={NextBtn} width={75} height={75} />
            </button>
          </div>
        </Fragment>
      )}

      {phase > 3 && (
        <div className={styles['robot-head']}>
          <Image alt='Robot Head' src={RobotHead} width={500} height={500} />
        </div>
      )}
      {phase === 4 && (
        <div className={styles['example']}>
          <div className={styles['problem-section']}>
            <div className={`${styles['puzzle-container']} ${styles['puzzle-problem']} `}>
              <Image alt='Screen' src={Screen} layout='fill' objectFit='cover' />
              <p>
                Pada kolom <em>GAMBAR</em> ini akan muncul objek yang perlu dikenali.
              </p>
            </div>
            <div className={`${styles['puzzle-container']} `}>
              <div className={styles['puzzle-box']} id='answer-box-1'></div>
              <div className={styles['puzzle-box']} id='answer-box-2'></div>
              <div className={styles['puzzle-box']} id='answer-box-3'></div>
              <div className={styles['puzzle-box']} id='answer-box-4'></div>
            </div>
          </div>

          <div className={styles['instruction-2']}>
            <div className={styles['options-container']}>
              <p>{introWording}</p>
            </div>
            <button onClick={() => setPhase((prev) => prev + 1)}>
              <Image alt='next' src={NextBtn} width={75} height={75} />
            </button>
          </div>
        </div>
      )}
      {phase === 5 && (
        <div className={styles['example']}>
          <div className={styles['problem-section']}>
            <div className={`${styles['puzzle-container']} ${styles['puzzle-problem']} `}>
              <Image alt='Screen' src={Screen} layout='fill' objectFit='cover' />
              <Image alt='Problem Example' src={ProblemExample} width={300} height={300} />
            </div>
            <div className={`${styles['puzzle-container']} `}>
              <div className={styles['puzzle-box']} id='answer-box-1'></div>
              <div className={styles['puzzle-box']} id='answer-box-2'></div>
              <div className={styles['puzzle-box']} id='answer-box-3'></div>
              <div className={styles['puzzle-box']} id='answer-box-4'></div>
            </div>
          </div>

          <div className={styles['instruction-2']}>
            <div className={styles['options-container']}>
              <p>{introWording}</p>
            </div>
            <button onClick={() => setPhase((prev) => prev + 1)}>
              <Image alt='next' src={NextBtn} width={75} height={75} />
            </button>
          </div>
        </div>
      )}
      {phase === 6 && (
        <div className={styles['example']}>
          <div className={styles['problem-section']}>
            <div className={`${styles['puzzle-container']} ${styles['puzzle-problem']} `}>
              <Image alt='Screen' src={Screen} layout='fill' objectFit='cover' />
              <Image alt='Problem Example' src={ProblemExample} width={300} height={300} />
            </div>
            <div className={`${styles['puzzle-container']}`}>
              <div className={styles['puzzle-box']} id='answer-box-1'></div>
              <div className={styles['puzzle-box']} id='answer-box-2'></div>
              <div className={styles['puzzle-box']} id='answer-box-3'></div>
              <div className={styles['puzzle-box']} id='answer-box-4'></div>
              <p className={styles['puzzle-box-instruction']}>
                Pindahkan potongan - potongan objek di bawah ke kolom ini untuk membentuk gambar asli
              </p>
            </div>
          </div>

          <div className={styles['instruction-2']}>
            <div className={styles['options-container']}>
              <div
                className={`${styles['puzzle-item']} ${styles['chunk-2']} value-2`}
                style={{ transform: 'rotate(270deg)' }}>
                <Image alt='Chunk 2' src={Chunk2} layout='fill' objectFit='cover' />
              </div>
              <div
                className={`${styles['puzzle-item']} ${styles['chunk-1']} value-1`}
                style={{ transform: 'rotate(180deg)' }}>
                <Image alt='Chunk 1' src={Chunk1} layout='fill' objectFit='cover' />
              </div>
              <div
                className={`${styles['puzzle-item']} ${styles['chunk-4']} value-4`}
                style={{ transform: 'rotate(90deg)' }}>
                <Image alt='Chunk 4' src={Chunk4} layout='fill' objectFit='cover' />
              </div>
              <div
                className={`${styles['puzzle-item']} ${styles['chunk-3']} value-3`}
                style={{ transform: 'rotate(0deg)' }}>
                <Image alt='Chunk 3' src={Chunk3} layout='fill' objectFit='cover' />
              </div>
            </div>
            <button onClick={() => setPhase((prev) => prev + 1)}>
              <Image alt='next' src={NextBtn} width={75} height={75} />
            </button>
          </div>
        </div>
      )}
      {phase === 7 && <Example setPhase={setPhase} />}
      {phase === 8 && (
        <div className={styles['example']}>
          <div className={styles['problem-section']}>
            <div className={`${styles['puzzle-container']} ${styles['puzzle-problem']} `}>
              <Image alt='Screen' src={Screen} layout='fill' objectFit='cover' />
              <Image alt='Problem Example' src={ProblemExample} width={300} height={300} />
            </div>
            <div className={`${styles['puzzle-container']}`}>
              <div style={{ border: 'none' }} className={styles['puzzle-box']} id='answer-box-1'>
                <Image alt='Chunk 1' src={Chunk1} layout='fill' objectFit='cover' />
              </div>
              <div style={{ border: 'none' }} className={styles['puzzle-box']} id='answer-box-2'>
                <Image alt='Chunk 2' src={Chunk2} layout='fill' objectFit='cover' />
              </div>
              <div style={{ border: 'none' }} className={styles['puzzle-box']} id='answer-box-3'>
                <Image alt='Chunk 3' src={Chunk3} layout='fill' objectFit='cover' />
              </div>
              <div style={{ border: 'none' }} className={styles['puzzle-box']} id='answer-box-4'>
                <Image alt='Chunk 4' src={Chunk4} layout='fill' objectFit='cover' />
              </div>
            </div>
          </div>

          <div className={styles['instruction-3']}>
            <div className={styles['options-container']}>
              <h3>Selamat, anda berhasil menyelesaikan tutorial!</h3>
              <div className={styles['action-button']}>
                <button className={styles['repeat']} onClick={() => setPhase(0)}>
                  Ulangi Instruksi
                </button>
                <Link passHref href='/game/problem-solving-test'>
                  <button className={styles['start']}>Mulai</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemSolvingIntro;

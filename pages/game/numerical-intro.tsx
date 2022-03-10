/* eslint-disable @next/next/link-passhref */
import { useState, useEffect, FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import type { NextPage } from 'next';
import { QuestionBoxProps, QuizProps } from './numerical-test';

import ProctorImage from '../../assets/Proctoring.png';
import RightIcon from '../../assets/Right-icon.png';
import WrongIcon from '../../assets/Wrong-icon.png';

import styles from './numerical-intro.module.scss';

interface NumericProps {
  nama: string;
}

interface IntroProps {
  proctorImage: any;
  addCounter: () => void;
}

interface TextProps {
  text: string;
}

interface ExplainationProps {
  text: string;
  position: string;
}

interface explanationProps {
  explanationText: string;
}

interface PanelProps {
  border: string;
  value?: number;
  counter: number;
}

const Proctor: FC<IntroProps> = (props) => {
  const { proctorImage, addCounter } = props;
  return (
    <div className={styles['proctorContainer']}>
      <Image
        src={proctorImage}
        alt='proctor'
        width={650}
        height={420}
        layout='fixed'
      />

      <p className={styles['proctorText']}>
        Scan wajah untuk mengakses ruang kendali
      </p>
      <button className={styles['submit']} onClick={() => addCounter()}>
        Submit
      </button>
    </div>
  );
};

const Story: FC<TextProps> = (props) => {
  const { text } = props;
  return (
    <div className={styles['storyContainer']}>
      <p className={styles['storyText']}>{text}</p>
    </div>
  );
};

const Panel: FC<PanelProps> = (props) => {
  const { border, counter, value } = props;
  return (
    <div className={styles['panelContainer']}>
      <div className={styles['ornament']} />
      <div className={`${styles['panel']} ${styles[border]}`}>
        {counter <= 15 && value}
      </div>
      <div className={styles['ornament']} />
    </div>
  );
};

const Explaination: FC<ExplainationProps> = (props) => {
  const { position, text } = props;

  return (
    <div className={`${styles['explainContainer']} ${styles[position]}`}>
      <p className={styles['explainText']}>{text}</p>
    </div>
  );
};

const QuestionBox: FC<QuestionBoxProps> = (props) => {
  const { rightAnswer, question, onAnswer, value, icon } = props;
  return (
    <div className={styles['questionBox']} onClick={onAnswer}>
      <p className={styles['questionText']}>{question}</p>

      {icon && (
        <div className={styles['icon']}>
          {rightAnswer === value ? (
            <Image src={RightIcon} width={20} height={20} alt='indicator' />
          ) : (
            <Image src={WrongIcon} width={20} height={20} alt='indicator' />
          )}
        </div>
      )}
    </div>
  );
};

const NumericalIntro: FC<NumericProps> = (props) => {
  const { nama } = props;

  const [renderBackground, setRenderBackground] = useState<string>('');
  const [renderBorder, setRenderBorder] = useState<string>('');
  const [renderPosition, setRenderPosition] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');

  const [visible, setVisible] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const [iconVisible, setIconVisible] = useState<boolean>(false);
  const [renderItem, setRenderItem] = useState<number>(0);

  const [question] = useState<QuizProps>({
    topLeft: [{ ask: '12 + 3 x 4' }, { ask: '18 + 5 x 2' }],
    topRight: [{ ask: '20 x 3 + 10' }, { ask: '14 - 9 x 1' }],
    bottomLeft: [{ ask: '18 - 8 x 9' }, { ask: '5 + 3 x 10' }],
    bottomRight: [{ ask: '15 x 6 : 7' }, { ask: '20 + 3 x 2' }],
  });
  const [result] = useState<number[]>([70, 80]);
  const [rightAnswer] = useState<string[]>(['topRight', 'bottomLeft']);

  const [story] = useState([
    { id: 1, text: `hi ${nama}, selamat datang di ruang kendali!` },
    {
      id: 2,
      text: `Beberapa jam lalu terjadi gangguan pada pesawat yang 
    belum diketahui penyebabnya. `,
    },
    {
      id: 3,
      text: `Hal ini menyebabkan beberapa sistem pada pesawat perlu
      pengaturan ulang.`,
    },
    {
      id: 4,
      text: `Ayo kita mulai dari Ruang Eksperimen Botani`,
    },
    {
      id: 5,
      text: `Ini adalah Ruang Eksperimen Botani untuk memantau berbagai
    macam uji coba yang kami lakukan terhadap tanaman`,
    },
    {
      id: 6,
      text: `Gangguan yang terjadi telah mengacaukan pengaturan
      sehingga suhu dari tiap-tiap display perlu diatur ulang.`,
    },
    {
      id: 7,
      text: `Apabila tidak dilakukan segera, akan sulit untuk menyelamatkan
    tanaman - tanaman ini.`,
    },
    {
      id: 8,
      text: `Pada kolom ini akan muncul temperatur 
      yang diperlukan`,
    },
    {
      id: 9,
      text: `Pada kolom ini akan muncul beberapa pilihan. `,
    },
    {
      id: 10,
      text: `Pilih jawaban yang paling tepat untuk memperoleh
      besar temperatur yang diperlukan`,
    },
    {
      id: 11,
      text: `Kita coba berlatih satu kali lagi`,
    },
    {
      id: 12,
      text: `Pilih jawaban secepat mungkin!`,
    },
    {
      id: 13,
      text: `Klik tombol 'Start' apabila Anda sudah siap`,
    },
  ]);

  useEffect(() => {
    if (counter <= 0) {
      setRenderBackground('enterance');
    }
    if (counter >= 2) {
      setRenderBackground('control');
    }
    if (counter > 6) {
      setRenderBackground('hydroponics');
    }
    if (counter > 9) {
      setRenderBackground('mission');
    }
  }, [counter]);

  useEffect(() => {
    if (counter === 10) {
      setRenderBorder('red');
    } else {
      setRenderBorder('');
    }
  }, [counter]);

  useEffect(() => {
    if (counter > 10) {
      setRenderPosition('top');
    } else {
      setRenderPosition('');
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
    setIconVisible(false);
    setUserAnswer('');
    if (counter === 12 && renderItem < rightAnswer.length - 1) {
      setRenderItem(renderItem + 1);
    }
  };

  const substractCounter = () => {
    setCounter(counter - 1);
    setIconVisible(false);
    setUserAnswer('');
    if (counter === 13 && renderItem > 0) {
      setRenderItem(renderItem - 1);
    }
  };

  const onAnswer: () => void = () => {
    if (counter >= 12 && counter <= 13) {
      setIconVisible(true);
      setUserAnswer('answered');
    }
  };

  return (
    <div className={`${styles['container']} ${styles[`${renderBackground}`]}`}>
      <Head>
        <title>Numerical Ability Intro</title>
        <meta name='description' content='Numerical Ability Intro Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className={styles['missionContainer']}>
          {visible ? (
            <Proctor
              proctorImage={ProctorImage}
              addCounter={() => addCounter()}
            />
          ) : (
            <div className={styles['buttonWraper']}>
              <button
                className={styles['button']}
                onClick={() => substractCounter()}
                disabled={counter <= 0}
              >
                {'<'}
              </button>

              {counter >= 3 && counter <= 9 && (
                <Story text={story[counter - 3].text} />
              )}

              <button
                className={styles['button']}
                onClick={() => addCounter()}
                disabled={
                  counter >= 15 ||
                  (counter === 12 && !userAnswer) ||
                  (counter === 13 && !userAnswer)
                }
              >
                {'>'}
              </button>
            </div>
          )}

          {counter >= 10 && (
            <>
              <div
                className={
                  counter === 11
                    ? styles['guideContainerRed']
                    : styles['guideContainer']
                }
              />{' '}
              <Panel
                border={renderBorder}
                value={result[renderItem]}
                counter={counter}
              />{' '}
            </>
          )}

          {counter >= 10 && counter <= 12 && (
            <>
              <Explaination
                text={story[counter - 3].text}
                position={renderPosition}
              />
              <div
                className={
                  counter === 10 ? styles['lineHelper'] : styles['dummy']
                }
              />
            </>
          )}

          {counter === 13 && (
            <>
              <Explaination
                text={story[counter - 3].text}
                position={renderPosition}
              />
            </>
          )}

          {counter >= 14 && (
            <>
              <Explaination text={story[counter - 3].text} position='middle' />
            </>
          )}

          {counter >= 11 && counter <= 13 && (
            <div className={styles['questionContainer']}>
              <div className={styles['questionDomain']}>
                <QuestionBox
                  onAnswer={() => onAnswer()}
                  question={question.topLeft[renderItem].ask}
                  rightAnswer={rightAnswer[renderItem]}
                  icon={iconVisible}
                  value='topLeft'
                />
              </div>
              <div className={styles['questionDomain']}>
                <QuestionBox
                  onAnswer={() => onAnswer()}
                  question={question.topRight[renderItem].ask}
                  rightAnswer={rightAnswer[renderItem]}
                  icon={iconVisible}
                  value='topRight'
                />
              </div>
              <div className={styles['questionDomain']}>
                <QuestionBox
                  onAnswer={() => onAnswer()}
                  question={question.bottomLeft[renderItem].ask}
                  rightAnswer={rightAnswer[renderItem]}
                  icon={iconVisible}
                  value='bottomLeft'
                />
              </div>
              <div className={styles['questionDomain']}>
                <QuestionBox
                  onAnswer={() => onAnswer()}
                  question={question.bottomRight[renderItem].ask}
                  rightAnswer={rightAnswer[renderItem]}
                  icon={iconVisible}
                  value='bottomRight'
                />
              </div>
            </div>
          )}

          {counter === 15 && (
            <Link href='/game/numerical-test'>
              <button className={styles['startButton']}>Mulai</button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
};

export default NumericalIntro;

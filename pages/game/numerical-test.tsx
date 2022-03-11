import React, { FC, Fragment, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { NumericalData } from '../../lib/numerical-data';
import { useStopwatch } from 'react-timer-hook';

import RightIcon from '../../assets/Right-icon.png';
import WrongIcon from '../../assets/Wrong-icon.png';

import styles from './numerical-test.module.scss';

export interface QuizProps {
  topLeft: { ask: string }[];
  topRight: { ask: string }[];
  bottomLeft: { ask: string }[];
  bottomRight: { ask: string }[];
}

export interface PanelProps {
  result: number;
}

export interface QuestionBoxProps {
  question: string;
  onAnswer?: () => void;
  icon: boolean;
  rightAnswer: string;
  value?: string;
}

const Panel: FC<PanelProps> = (props) => {
  const { result } = props;
  return (
    <div className={styles['panelContainer']}>
      <div className={styles['ornament']} />
      <div className={styles['panel']}>{result}</div>
      <div className={styles['ornament']} />
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

const NumericalTest: NextPage = () => {
  const { question, result, rightAnswer } = NumericalData();
  const { data: session, status } = useSession();
  const [iconVisible, setIconVisible] = useState<boolean>(false);
  const [renderItem, setRenderItem] = useState<number>(0);
  const [item, setItem] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<
    {
      answer: string;
      time: number;
      isCorrect: boolean;
    }[]
  >([]);

  const [currentCount, setCount] = useState<number>(0);
  const { seconds, minutes, reset, pause } = useStopwatch({
    autoStart: true,
  });

  useEffect(() => {
    if (currentCount >= 0 && iconVisible) {
      const timer = () => setCount(currentCount - 1);
      const id = setInterval(timer, 1000);
      return () => clearInterval(id);
    } else {
      setRenderItem(item);
      setIconVisible(false);
    }
  }, [currentCount, iconVisible, item]);

  useEffect(() => {
    if (currentCount < 0) {
      reset();
    }
  }, [currentCount]); // eslint-disable-line

  useEffect(() => {
    if (userAnswer.length === rightAnswer.length) {
      let answerResult: {
        [key: string]: any;
      } = {};
      userAnswer.forEach((answer, index) => {
        answerResult[`ans${index + 1}`] = {
          answer: answer.answer,
          isCorrect: answer.isCorrect,
          time: answer.time,
        };
      });

      const userData = { email: session?.user?.email };
      if (renderItem !== 5) {
        fetch('/api/game/numerical-test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answerResult,
            userData,
          }),
        })
          .then((res) => res.json())
          .then((resJSON) => console.log(resJSON))
          .catch((err) => console.log(err));
      }
    }
  }, [userAnswer]); // eslint-disable-line

  const onAnswer: (value: string) => void = (value) => {
    if (renderItem <= rightAnswer.length - 1) {
      setItem(item + 1);
      let isCorrect = false;
      if (rightAnswer[renderItem] === value) {
        isCorrect = true;
      }

      let answer = '';
      switch (value) {
        case 'topLeft':
          answer = question.topLeft[renderItem].ask;
          break;
        case 'topRight':
          answer = question.topRight[renderItem].ask;
          break;
        case 'bottomLeft':
          answer = question.bottomLeft[renderItem].ask;
          break;
        case 'bottomRight':
          answer = question.bottomRight[renderItem].ask;
          break;
        default:
          answer = '';
      }

      const dataToSave = {
        answer,
        time: seconds,
        isCorrect,
      };
      setUserAnswer((prevState) => {
        const newState = [...prevState];
        newState.push(dataToSave);
        return newState;
      });
      // userAnswer.push(dataToSave);
    }
    setIconVisible(true);
    setCount(0);
  };

  return (
    <div className={styles['container']}>
      <Head>
        <title>Save The Plants</title>
        <meta name='description' content='Save The Plants Test Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className={styles['missionContainer']}>
          <div className={styles['guideWraper']}>
            <div className={styles['guideContainer']}>
              {renderItem > rightAnswer.length - 1 && (
                <div className={styles['complete-text']}>
                  <p className={styles['textDone']}>Selamat kamu telah berhasil mengatur suhu tiap display tanaman!</p>

                  <Link href='/game'>Kembali ke Deck</Link>
                </div>
              )}
            </div>
            <Panel result={result[renderItem]} />
            {renderItem <= rightAnswer.length - 1 && (
              <div className={styles['questionContainer']}>
                <div className={styles['questionDomain']}>
                  <QuestionBox
                    onAnswer={() => onAnswer('topLeft')}
                    question={question.topLeft[renderItem].ask}
                    rightAnswer={rightAnswer[renderItem]}
                    value='topLeft'
                    icon={iconVisible}
                  />
                </div>

                <div className={styles['questionDomain']}>
                  <QuestionBox
                    onAnswer={() => onAnswer('topRight')}
                    question={question.topRight[renderItem].ask}
                    rightAnswer={rightAnswer[renderItem]}
                    value='topRight'
                    icon={iconVisible}
                  />
                </div>

                <div className={styles['questionDomain']}>
                  <QuestionBox
                    onAnswer={() => onAnswer('bottomLeft')}
                    question={question.bottomLeft[renderItem].ask}
                    rightAnswer={rightAnswer[renderItem]}
                    value='bottomLeft'
                    icon={iconVisible}
                  />
                </div>

                <div className={styles['questionDomain']}>
                  <QuestionBox
                    onAnswer={() => onAnswer('bottomRight')}
                    question={question.bottomRight[renderItem].ask}
                    rightAnswer={rightAnswer[renderItem]}
                    value='bottomRight'
                    icon={iconVisible}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NumericalTest;

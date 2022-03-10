import React, { FC, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
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

  const [iconVisible, setIconVisible] = useState<boolean>(false);
  const [renderItem, setRenderItem] = useState<number>(0);
  const [item, setItem] = useState<number>(0);
  const [userAnswer] = useState<
    {
      answer: string;
      time: number;
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
  }, [currentCount]);

  const onAnswer: (value: string) => void = (value) => {
    if (renderItem <= rightAnswer.length - 1) {
      setItem(item + 1);
      const dataToSave = {
        answer: `soal ${renderItem + 1}`,
        time: seconds,
      };
      userAnswer.push(dataToSave);
    }
    setIconVisible(true);
    setCount(0);
  };

  return (
    <div className={styles['container']}>
      <Head>
        <title>Numerical Intro Ability Test</title>
        <meta name='description' content='Numerical Ability Test Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className={styles['missionContainer']}>
          <div className={styles['guideWraper']}>
            <div className={styles['guideContainer']}>
              {renderItem > rightAnswer.length - 1 && (
                <p className={styles['textDone']}>
                  Selamat kamu telah berhasil mengatur suhu tiap display
                  tanaman!!
                </p>
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

import React, { FC, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { NumericalData } from '../../lib/numerical-data';

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

  // const [question] = useState<QuizProps>({
  //   topLeft: [
  //     { ask: '12 + 3 x 4' },
  //     { ask: '18 + 5 x 2' },
  //     { ask: '6 x 30 : 3' },
  //     { ask: '72 : 3 x 5' },
  //   ],
  //   topRight: [
  //     { ask: '20 x 3 + 10' },
  //     { ask: '14 - 9 x 1' },
  //     { ask: '32 - 9 x 4' },
  //     { ask: '186 + 34 - 70' },
  //   ],
  //   bottomLeft: [
  //     { ask: '18 - 8 x 9' },
  //     { ask: '5 + 3 x 10' },
  //     { ask: '64 + 3 : 5' },
  //     { ask: '63 - 23 : 3' },
  //   ],
  //   bottomRight: [
  //     { ask: '15 x 6 : 7' },
  //     { ask: '20 + 3 x 2' },
  //     { ask: '196 + 5 - 98' },
  //     { ask: '5 x 5 x 2' },
  //   ],
  // });
  // const [result] = useState<number[]>([70, 80, 60, 50]);
  // const [rightAnswer] = useState<string[]>([
  //   'topRight',
  //   'bottomLeft',
  //   'topLeft',
  //   'bottomRight',
  // ]);

  const [iconVisible, setIconVisible] = useState<boolean>(false);
  const [renderItem, setRenderItem] = useState<number>(0);
  const [item, setItem] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');

  const [currentCount, setCount] = useState<number>(0);

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

  const onAnswer: (value: string) => void = (value) => {
    if (renderItem < rightAnswer.length - 1) {
      setItem(item + 1);
      setUserAnswer(value);
    }
    setIconVisible(true);
    setCount(2);
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
            <div className={styles['guideContainer']} />
            <Panel result={result[renderItem]} />
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default NumericalTest;

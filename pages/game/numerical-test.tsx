import React, { FC, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import SteerImage from '../../assets/Steering.png';

import styles from './numerical-test.module.scss';
import { render } from 'sass';
import { count } from 'console';

interface QuizProps {
  one: number;
  two: number;
  three: number;
}

interface GuideProps {
  leftBgColor: string;
  rightBgColor: string;
}

interface SteerProps {
  onAnswer: (value: string) => void;
  operator?: string;
  disabled: boolean;
}

interface AsteroidProps {
  number: QuizProps;
}

const Guide: FC<GuideProps> = (props) => {
  const { leftBgColor, rightBgColor } = props;

  return (
    <div className={`${styles['guideContainer']} `}>
      <div className={`${styles['guideScreen']} ${styles[`${leftBgColor}`]}`} />
      <div
        className={`${styles['guideScreen']} ${styles[`${rightBgColor}`]}`}
      />
    </div>
  );
};

const Steer: FC<SteerProps> = (props) => {
  const { onAnswer, operator, disabled } = props;

  return (
    <div className={`${styles['steerContainer']}`}>
      <div className={`${styles['shapeWraper']}`}>
        <div className={`${styles['oval']}`}>
          <p className={`${styles['operator']}`}>{operator}</p>
        </div>
        <div className={`${styles['ovalShadow']}`}></div>

        <Image
          src={SteerImage}
          alt='Steering-wheel'
          width={1000}
          height={200}
          layout='fixed'
        />
        <div className={`${styles['selectorWrapper']}`}>
          <div className={`${styles['triangleLeft']}`} />
          <button
            className={`${styles['triangleLeftButton']}`}
            onClick={(event) => onAnswer('left')}
            disabled={disabled}
          />

          <div className={`${styles['triangleRight']}`} />
          <button
            className={`${styles['triangleRightButton']}`}
            onClick={(event) => onAnswer('right')}
            disabled={disabled}
          />
        </div>
        <div className={`${styles['shadowWrapper']}`}>
          <div className={`${styles['triangleLeftShadow']}`} />
          <div className={`${styles['triangleRightShadow']}`} />
        </div>
      </div>
    </div>
  );
};

const Asteroid: FC<AsteroidProps> = (props) => {
  const { number } = props;

  return (
    <>
      <div className={`${styles['asteroidBox']} ${styles['top']}`}>
        <p className={`${styles['asteroidNumber']} `}>{number.one}</p>
      </div>

      <div className={`${styles['asteroidBox']} ${styles['middle']}`}>
        <p className={`${styles['asteroidNumber']} `}>{number.two}</p>
      </div>

      <div className={`${styles['asteroidBox']} ${styles['bottom']}`}>
        <p className={`${styles['asteroidNumber']} `}>{number.three}</p>
      </div>
    </>
  );
};

const NumericalTest: NextPage = () => {
  const [questionLeft] = useState<AsteroidProps['number'][]>([
    { one: 1, two: 2, three: 3 },
    { one: 3, two: 3, three: 7 },
    { one: 9, two: 2, three: 1 },
    { one: 5, two: 2, three: 4 },
  ]);

  const [questionRight] = useState<AsteroidProps['number'][]>([
    { one: 5, two: 1, three: 5 },
    { one: 7, two: 2, three: 6 },
    { one: 2, two: 3, three: 7 },
    { one: 5, two: 4, three: 8 },
  ]);
  const [operator] = useState<string>('+');

  const [visible, setVisible] = useState<boolean>(true);
  const [renderItem, setRenderItem] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [rightAnswer, setRightAnswer] = useState<string>('');
  const [leftBgColor, setLeftBgColor] = useState<string>('');
  const [rightBgColor, setRightBgColor] = useState<string>('');

  const [currentCount, setCount] = useState<number>(0);

  useEffect(() => {
    let totalLeft = 0;
    let totalRight = 0;

    if (operator === '+') {
      totalLeft =
        totalLeft +
        questionLeft[renderItem].one +
        questionLeft[renderItem].two +
        questionLeft[renderItem].three;

      totalRight =
        totalRight +
        questionRight[renderItem].one +
        questionRight[renderItem].two +
        questionRight[renderItem].three;
    }

    if (operator === 'x') {
      totalLeft =
        totalLeft +
        questionLeft[renderItem].one *
          questionLeft[renderItem].two *
          questionLeft[renderItem].three;

      totalRight =
        totalRight +
        questionRight[renderItem].one *
          questionRight[renderItem].two *
          questionRight[renderItem].three;
    }

    if (totalLeft < totalRight) {
      setRightAnswer('left');
    }
    if (totalLeft > totalRight) {
      setRightAnswer('right');
    }
  }, [operator, questionLeft, questionRight, renderItem]);

  useEffect(() => {
    if (currentCount >= 0 && visible === false) {
      const timer = () => setCount(currentCount - 1);
      const id = setInterval(timer, 1000);
      return () => clearInterval(id);
    } else {
      setLeftBgColor('');
      setRightBgColor('');
      setVisible(true);
    }
  }, [currentCount, visible]);

  const onAnswer: (value: string) => void = (value) => {
    setVisible(false);
    setUserAnswer(value);
    setCount(2);
    setRenderItem(renderItem + 1);
  };

  useEffect(() => {
    if (visible === false) {
      if (rightAnswer === 'left' && userAnswer === 'left') {
        setLeftBgColor('green');
      }
      if (rightAnswer === 'right' && userAnswer === 'left') {
        setLeftBgColor('red');
        console.log('jalan');
      }
      if (rightAnswer === 'right' && userAnswer === 'right') {
        setRightBgColor('green');
      }
      if (rightAnswer === 'left' && userAnswer === 'right') {
        setRightBgColor('red');
      }
    }
  }, [rightAnswer, userAnswer, visible]);

  return (
    <div className={`${styles['container']} `}>
      <Head>
        <title>Numerical Intro Ability Test</title>
        <meta name='description' content='Numerical Ability Test Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className={`${styles['missionContainer']}`}>
          <Guide leftBgColor={leftBgColor} rightBgColor={rightBgColor} />
          <Steer
            operator={operator}
            onAnswer={(value) => onAnswer(value)}
            disabled={!visible || renderItem >= questionLeft.length - 1}
          />
          {visible && renderItem < questionLeft.length - 1 && (
            <div className={`${styles['asteroidContainer']} `}>
              <div className={`${styles['asteroidScreen']} `}>
                <Asteroid number={questionLeft[renderItem]} />
                );
              </div>

              <div className={`${styles['asteroidScreen']} `}>
                <Asteroid number={questionRight[renderItem]} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NumericalTest;

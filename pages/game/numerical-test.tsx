import React, { FC, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import SteerImage from '../../assets/Steering.png';

import styles from './numerical-test.module.scss';

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
  number: number;
  index?: number;
  direction?: string;
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
  console.log(disabled);

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
  const { number, index, direction } = props;

  const [position, setPosition] = useState('normal');

  useEffect(() => {
    if (index === 1) {
      setPosition('middle');
    }
    if (index === 2) {
      setPosition('bottom');
    }
  }, [index]);

  return (
    <div className={`${styles['asteroidBox']} ${styles[position]}`}>
      <p className={`${styles['asteroidNumber']} `}>{number}</p>
    </div>
  );
};

const NumericalTest: NextPage = () => {
  const [questionLeft] = useState<AsteroidProps['number'][]>([9, 3, 5]);
  const [questionRight] = useState<AsteroidProps['number'][]>([7, 4, 2]);
  const [operator] = useState<string>('+');

  const [visible, setVisible] = useState<boolean>(true);
  const [rightAnswer, setRightAnswer] = useState<string>('');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [leftBgColor, setLeftBgColor] = useState<string>('normal');
  const [rightBgColor, setRightBgColor] = useState<string>('normal');

  const [currentCount, setCount] = useState<number>(0);

  useEffect(() => {
    let totalLeft = 0;
    let totalRight = 0;

    if (operator === '+') {
      totalLeft =
        totalLeft + questionLeft[0] + questionLeft[1] + questionLeft[2];

      totalRight =
        totalRight + questionRight[0] + questionRight[1] + questionRight[2];
    }

    if (operator === 'x') {
      totalLeft =
        totalLeft + questionLeft[0] * questionLeft[1] * questionLeft[2];

      totalRight =
        totalRight + questionRight[0] * questionRight[1] * questionRight[2];
    }

    if (totalLeft < totalRight) {
      setRightAnswer('left');
    }
    if (totalLeft > totalRight) {
      setRightAnswer('right');
    }
  }, [operator, questionLeft, questionRight]);

  useEffect(() => {
    if (currentCount >= 0 && visible === false) {
      const timer = () => setCount(currentCount - 1);
      const id = setInterval(timer, 1000);
      return () => clearInterval(id);
    } else {
      setLeftBgColor('normal');
      setRightBgColor('normal');
      setVisible(true);
    }
  }, [currentCount, visible]);

  const onAnswer: (value: string) => void = (value) => {
    setVisible(false);
    setUserAnswer(value);
    setCount(1);
  };

  useEffect(() => {
    if (rightAnswer === 'left' && userAnswer === 'left') {
      setLeftBgColor('green');
    }
    if (rightAnswer === 'right' && userAnswer === 'left') {
      setLeftBgColor('red');
    }
    if (rightAnswer === 'right' && userAnswer === 'right') {
      setRightBgColor('green');
    }
    if (rightAnswer === 'left' && userAnswer === 'right') {
      setRightBgColor('red');
    }
  }, [rightAnswer, userAnswer]);

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
            disabled={!visible}
          />
          {visible && (
            <div className={`${styles['asteroidContainer']} `}>
              <div className={`${styles['asteroidScreen']} `}>
                {questionLeft.map((data, index) => {
                  return <Asteroid number={data} index={index} key={index} />;
                })}
              </div>

              <div className={`${styles['asteroidScreen']} `}>
                {questionRight.map((data, index) => {
                  return <Asteroid number={data} index={index} key={index} />;
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NumericalTest;

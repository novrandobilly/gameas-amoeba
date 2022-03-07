import type { NextPage } from 'next';
import { DragEvent, MouseEvent as MouseEventClick, useState } from 'react';
import Problem1 from '../../components/problem-solving/problem-1';
import Problem2 from '../../components/problem-solving/problem-2';
import Problem3 from '../../components/problem-solving/problem-3';
import Problem4 from '../../components/problem-solving/problem-4';
import Problem5 from '../../components/problem-solving/problem-5';
import { answerType } from '../../lib/utilityTypes';

import Head from 'next/head';
import styles from './problem-solving-test.module.scss';

const initialAnswer = {
  1: {
    isCorrect: false,
    time: null,
  },
  2: {
    isCorrect: false,
    time: null,
  },
  3: {
    isCorrect: false,
    time: null,
  },
  4: {
    isCorrect: false,
    time: null,
  },
  5: {
    isCorrect: false,
    time: null,
  },
};

const ProblemSolving: NextPage = () => {
  const [testPhase, setTestPhase] = useState<number>(1);
  const [answerResult, setAnswerResult] = useState<answerType>(initialAnswer);
  const onDragStartHandler = (event: DragEvent<HTMLDivElement>) => {
    const item = event.target as HTMLElement;
    item.classList.add(styles['dragging']);
    item.classList.add('dragging');
  };

  const onDragOverHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const dragOverElement = document.querySelector(`.${styles['dragging']}`);
    const container = event.target as HTMLElement;
    const containerId = container.id;
    const containerElement = document.getElementById(containerId);
    if (dragOverElement && containerElement) {
      containerElement.appendChild(dragOverElement);
    }
    return containerId;
  };

  const onDragEndHandler = (event: DragEvent<HTMLDivElement>) => {
    const item = event.target as HTMLElement;
    item.classList.remove(styles['dragging']);
    item.classList.remove('dragging');
  };

  const onClickHandler = (event: MouseEventClick) => {
    const item = event.target as HTMLElement;
    const classList = item.getAttribute('class');
    const transformVal = item.style.transform;
    const rotateVal = transformVal.slice(7, transformVal.length - 4);
    const newRotateVal = parseInt(rotateVal === '' ? '0' : rotateVal) + 90;
    item.style.transform = `rotate(${newRotateVal}deg)`;
    return {
      classList: classList || '',
      rotateVal: newRotateVal % 360,
    };
  };

  const onBackHandler = () => {
    setTestPhase((prevState) => {
      if (prevState > 1 && prevState < 7) return (prevState -= 1);
      return prevState;
    });
  };

  const onPassHandler = () => {
    setTestPhase((prevState) => {
      if (prevState > 0 && prevState < 6) return (prevState += 1);
      return prevState;
    });
  };

  return (
    <div>
      <Head>
        <title>Problem Solving Ability Test</title>
        <meta name='description' content='Problem Solving Ability Test Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <section className={styles['test-section']}>
          {testPhase === 1 && (
            <Problem1
              onDragOverHandler={onDragOverHandler}
              onDragStartHandler={onDragStartHandler}
              onDragEndHandler={onDragEndHandler}
              onClickHandler={onClickHandler}
              setTestPhase={setTestPhase}
              setAnswerResult={setAnswerResult}
            />
          )}
          {testPhase === 2 && (
            <Problem2
              onDragOverHandler={onDragOverHandler}
              onDragStartHandler={onDragStartHandler}
              onDragEndHandler={onDragEndHandler}
              onClickHandler={onClickHandler}
              setTestPhase={setTestPhase}
              setAnswerResult={setAnswerResult}
            />
          )}
          {testPhase === 3 && (
            <Problem3
              onDragOverHandler={onDragOverHandler}
              onDragStartHandler={onDragStartHandler}
              onDragEndHandler={onDragEndHandler}
              onClickHandler={onClickHandler}
              setTestPhase={setTestPhase}
              setAnswerResult={setAnswerResult}
            />
          )}
          {testPhase === 4 && (
            <Problem4
              onDragOverHandler={onDragOverHandler}
              onDragStartHandler={onDragStartHandler}
              onDragEndHandler={onDragEndHandler}
              onClickHandler={onClickHandler}
              setTestPhase={setTestPhase}
              setAnswerResult={setAnswerResult}
            />
          )}
          {testPhase === 5 && (
            <Problem5
              onDragOverHandler={onDragOverHandler}
              onDragStartHandler={onDragStartHandler}
              onDragEndHandler={onDragEndHandler}
              onClickHandler={onClickHandler}
              setTestPhase={setTestPhase}
              setAnswerResult={setAnswerResult}
            />
          )}

          <div className={styles['problem-navigation']}>
            {testPhase > 1 && (
              <button className={styles['back-button']} onClick={onBackHandler}>
                Back
              </button>
            )}
            {testPhase < 6 && (
              <button className={styles['pass-button']} onClick={onPassHandler}>
                Pass
              </button>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProblemSolving;

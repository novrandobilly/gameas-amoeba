import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { DragEvent, MouseEvent as MouseEventClick, useEffect, useState } from 'react';
import Link from 'next/link';
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
    time: 0,
  },
  2: {
    isCorrect: false,
    time: 0,
  },
  3: {
    isCorrect: false,
    time: 0,
  },
  4: {
    isCorrect: false,
    time: 0,
  },
  5: {
    isCorrect: false,
    time: 0,
  },
};

const ProblemSolving: NextPage = () => {
  const [testPhase, setTestPhase] = useState<number>(1);
  const [answerResult, setAnswerResult] = useState<answerType>(initialAnswer);
  const [timer, setTimer] = useState<number>(10);
  const { data: session, status } = useSession();

  const onSubmitHandler = () => {
    fetch('/api/game/problem-solving', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answerResult,
        userData: {
          email: session?.user?.email,
        },
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((resJSON) => console.log(resJSON))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (testPhase !== 6) {
      let counter = setInterval(() => {
        if (timer === 0) {
          onSubmitHandler();
          setTestPhase(6);
        }
        setTimer((prevState) => {
          if (prevState === 0) {
            clearInterval(counter);
          }
          const updatedTimer = prevState - 1;
          return updatedTimer;
        });
      }, 1000);
      return () => clearInterval(counter);
    }
  }, [timer]); // eslint-disable-line

  useEffect(() => {
    let testIsFinished = true;

    for (const key in answerResult) {
      testIsFinished = testIsFinished && answerResult[key].isCorrect;
    }

    if (testIsFinished) {
      onSubmitHandler();
      setTimeout(() => {
        setTestPhase(6);
      }, 1000);
    }
  }, [answerResult]); // eslint-disable-line

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
      let newPhase = prevState - 1;
      if (prevState > 1 && prevState < 7) {
        while (newPhase > 0 && newPhase < 6 && answerResult[newPhase]?.isCorrect) {
          newPhase -= 1;
        }
        if (newPhase > 0 && newPhase < 6) return newPhase;
      }
      return prevState;
    });
  };

  const onPassHandler = () => {
    setTestPhase((prevState) => {
      let newPhase = prevState + 1;
      if (newPhase === 6) newPhase = 1;
      if (prevState > 0 && prevState < 6) {
        while (newPhase > 0 && newPhase < 6 && answerResult[newPhase]?.isCorrect) {
          newPhase += 1;
        }
        if (newPhase > 1 && newPhase < 6) return newPhase;
      }
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

      <main className={styles['container']}>
        {/* <p>{timer}</p>
        <p style={{ margin: '0' }}>problem 1 timer: {answerResult[1].time}</p>
        <p style={{ margin: '0' }}>problem 1 timer: {answerResult[2].time}</p>
        <p style={{ margin: '0' }}>problem 1 timer: {answerResult[3].time}</p>
        <p style={{ margin: '0' }}>problem 1 timer: {answerResult[4].time}</p>
        <p style={{ margin: '0' }}>problem 1 timer: {answerResult[5].time}</p> */}
        <section className={styles['test-section']}>
          {testPhase === 1 && (
            <Problem1
              onDragOverHandler={onDragOverHandler}
              onDragStartHandler={onDragStartHandler}
              onDragEndHandler={onDragEndHandler}
              onClickHandler={onClickHandler}
              setTestPhase={setTestPhase}
              setAnswerResult={setAnswerResult}
              onPassHandler={onPassHandler}
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
              onPassHandler={onPassHandler}
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
              onPassHandler={onPassHandler}
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
              onPassHandler={onPassHandler}
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
              onPassHandler={onPassHandler}
            />
          )}

          {testPhase === 6 && (
            <div className={styles['closing']}>
              <h1>Selamat, Anda telah berhasil memperbaiki sistem kembali seperti semula</h1>
              <Link href='/game'>Kembali ke deck pesawat</Link>
            </div>
          )}

          <div className={styles['problem-navigation']}>
            {testPhase > 1 && testPhase < 6 && (
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

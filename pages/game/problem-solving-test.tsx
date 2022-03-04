import type { NextPage } from 'next';
import { DragEvent, MouseEvent as MouseEventClick, useState } from 'react';
import Problem1 from '../../components/problem-solving/problem-1';
import Problem2 from '../../components/problem-solving/problem-2';

import Head from 'next/head';
import styles from './problem-solving-test.module.scss';

const ProblemSolving: NextPage = () => {
  const [testPhase, setTestPhase] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
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
            />
          )}
          {testPhase === 2 && (
            <Problem2
              onDragOverHandler={onDragOverHandler}
              onDragStartHandler={onDragStartHandler}
              onDragEndHandler={onDragEndHandler}
              onClickHandler={onClickHandler}
              setTestPhase={setTestPhase}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default ProblemSolving;

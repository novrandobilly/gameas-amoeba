import { DragEvent, MouseEvent as MouseEventClick, useEffect, useState, FC } from 'react';
import Image from 'next/image';
import Screen from '../../assets/numerical-test-2/standard-condition-container.png';
import ProblemExample from '../../assets/problem-solving/example_2x2/main.jpeg';

import styles from './example.module.scss';

const initialData = [
  { order: null, rotateValue: null },
  { order: null, rotateValue: null },
  { order: null, rotateValue: null },
  { order: null, rotateValue: null },
];
let correctStyles = '';

const Example: FC<{ setPhase: React.Dispatch<React.SetStateAction<number>> }> = ({ setPhase }) => {
  const [chunkOrder, setChunkOrder] = useState<{ order: number | null; rotateValue: number | null }[]>(initialData);

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

  const onDragOverAnswer = (event: DragEvent<HTMLDivElement>) => {
    // Get container Id for determine index
    const containerId = onDragOverHandler(event);
    const Id = parseInt(containerId.replace('answer-box-', ''));

    // Get rotate value
    const element = document.querySelector('.dragging');
    const elementStyle = element?.getAttribute('style');
    const rotateVal = elementStyle
      ?.split('')
      .filter((char) => !isNaN(parseInt(char)))
      .join('');

    // Set chunk order input to null when the element leaving the box (doesn't have child nodes)
    const answerBoxArr = Array.from(document.querySelectorAll(`.${styles['puzzle-box']}`));
    answerBoxArr.forEach((box, index) => {
      if (!box.hasChildNodes()) {
        setChunkOrder((prevState) => {
          const newState = [...prevState];
          newState[index] = {
            order: null,
            rotateValue: null,
          };
          return newState;
        });
      }
    });

    if (element && rotateVal) {
      // Get order value
      const elementClass = element.getAttribute('class');
      const classValue = elementClass?.split(' ').filter((cls) => cls.includes('value'));

      // update chunk order value
      if (classValue) {
        const value = parseInt(classValue[0]?.replace('value-', ''));
        setChunkOrder((prevState) => {
          const newState = [...prevState];
          if (newState[Id - 1].order !== null && newState[Id - 1].rotateValue !== null) {
            return newState;
          }
          const newAnswer = {
            rotateValue: parseInt(rotateVal) % 360,
            order: value,
          };
          newState[Id - 1] = newAnswer;
          return newState;
        });
      }
    }
  };

  const onDragOverOption = (event: DragEvent<HTMLDivElement>) => {
    const containerId = onDragOverHandler(event);
    const element = document.querySelector('.dragging');

    if (element && containerId === 'option-box') {
      const elementClass = element.getAttribute('class');
      const classValue = elementClass?.split(' ').filter((cls) => cls.includes('value'));

      if (classValue) {
        const value = parseInt(classValue[0].replace('value-', ''));
        const chunkIndex = chunkOrder.findIndex((chunk) => {
          return chunk?.order === value;
        });

        if (chunkIndex !== -1) {
          setChunkOrder((prevState) => {
            const newState = [...prevState];
            newState[chunkIndex] = {
              order: null,
              rotateValue: null,
            };
            return newState;
          });
        }
      }
    }
  };

  const onRotateAnswer = (event: MouseEventClick) => {
    const { classList, rotateVal } = onClickHandler(event);

    const classValue = classList.split(' ').filter((cls) => cls.includes('value'));

    if (classValue) {
      const orderValue = parseInt(classValue[0].replace('value-', ''));
      const chunkIndex = chunkOrder.findIndex((chunk) => {
        return chunk?.order === orderValue;
      });
      setChunkOrder((prevState) => {
        const newState = [...prevState];
        newState[chunkIndex] = {
          ...newState[chunkIndex],
          rotateValue: rotateVal,
        };
        return newState;
      });
    }
  };

  //   USE hasChildNodes() to increase validation
  useEffect(() => {
    const answerBoxArr = Array.from(document.querySelectorAll(`.${styles['puzzle-box']}`));
    let answerIsCorrect = true;
    answerBoxArr.forEach((box) => {
      answerIsCorrect = box.hasChildNodes() && answerIsCorrect;
    });

    if (answerIsCorrect) {
      chunkOrder.forEach((chunk, index) => {
        answerIsCorrect = answerIsCorrect && chunk.order === index + 1 && chunk.rotateValue === 0;
      });
    }
    if (answerIsCorrect) {
      setPhase(8);
    }
  }, [chunkOrder]); // eslint-disable-line

  // Remove border when node is filled
  useEffect(() => {
    const answerBoxArr = Array.from(document.querySelectorAll(`.${styles['puzzle-box']}`));
    answerBoxArr.forEach((box) => {
      box.setAttribute('style', box.hasChildNodes() ? 'border:none' : 'border:""');
    });
  }, [chunkOrder]);

  return (
    <div className={styles['example']}>
      <div className={styles['problem-section']}>
        <div className={`${styles['puzzle-container']} ${styles['puzzle-problem']} `}>
          <Image alt='Screen' src={Screen} layout='fill' objectFit='cover' />
          <Image alt='Problem Example' src={ProblemExample} width={300} height={300} />
        </div>
        <div className={`${styles['puzzle-container']} ${correctStyles}`}>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-1'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-2'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-3'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-4'></div>
        </div>
      </div>

      {/* <div className={styles['instruction-2']}>
        <div
          className={`${styles['options-container']} ${styles['answer-section']}`}
          id='option-box'
          onDragOver={onDragOverOption}>
          <div
            className={`${styles['puzzle-item']} ${styles['chunk-2']} value-2`}
            draggable
            onDragStart={onDragStartHandler}
            onDragEnd={onDragEndHandler}
            onClick={onRotateAnswer}
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
      </div> */}

      <div className={styles['answer-section']} id='option-box' onDragOver={onDragOverOption}>
        <div
          className={`${styles['puzzle-item']} ${styles['chunk-2']} value-2`}
          draggable
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onClick={onRotateAnswer}
          style={{ transform: 'rotate(270deg)' }}></div>
        <div
          className={`${styles['puzzle-item']} ${styles['chunk-1']} value-1`}
          draggable
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onClick={onRotateAnswer}
          style={{ transform: 'rotate(180deg)' }}></div>
        <div
          className={`${styles['puzzle-item']} ${styles['chunk-4']} value-4`}
          draggable
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onClick={onRotateAnswer}
          style={{ transform: 'rotate(90deg)' }}></div>
        <div
          className={`${styles['puzzle-item']} ${styles['chunk-3']} value-3`}
          draggable
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onClick={onRotateAnswer}
          style={{ transform: 'rotate(0deg)' }}></div>
      </div>
    </div>
  );
};

export default Example;

import { FC, DragEvent, Fragment, useState, useEffect } from 'react';
import { MouseEvent as MouseEventClick } from 'react';
import { ProblemSolvingType } from '../../lib/utilityTypes';
import styles from './problem-4.module.scss';

const initialData = [
  { order: null, rotateValue: null },
  { order: null, rotateValue: null },
  { order: null, rotateValue: null },
  { order: null, rotateValue: null },
  { order: null, rotateValue: null },
  { order: null, rotateValue: null },
  { order: null, rotateValue: null },
  { order: null, rotateValue: null },
  { order: null, rotateValue: null },
];

let correctStyles = '';
const Problem4: FC<ProblemSolvingType> = ({
  onDragStartHandler,
  onDragOverHandler,
  onDragEndHandler,
  onClickHandler,
  setTestPhase,
  setAnswerResult,
}) => {
  const [chunkOrder, setChunkOrder] = useState<{ order: number | null; rotateValue: number | null }[]>(initialData);

  useEffect(() => {
    let counter = setInterval(() => {
      setAnswerResult((prevState) => {
        const newState = { ...prevState };
        newState[4] = {
          ...newState[4],
          time: newState[4]?.time + 1,
        };
        return newState;
      });
    }, 1000);
    return () => clearInterval(counter);
  }, []);

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
        const value = parseInt(classValue[0].replace('value-', ''));
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
      setAnswerResult((prevState) => {
        const newState = { ...prevState };
        newState[4] = {
          ...newState[4],
          isCorrect: true,
        };
        return newState;
      });
      let nextPhaseTimer = setTimeout(() => {
        setTestPhase(5);
      }, 1000);
      return () => clearTimeout(nextPhaseTimer);
    }
  }, [chunkOrder]);

  // Remove border when node is filled
  useEffect(() => {
    const answerBoxArr = Array.from(document.querySelectorAll(`.${styles['puzzle-box']}`));
    answerBoxArr.forEach((box) => {
      box.setAttribute('style', box.hasChildNodes() ? 'border:none' : 'border:""');
    });
  }, [chunkOrder]);

  return (
    <Fragment>
      <div className={styles['problem-section']}>
        <div className={`${styles['puzzle-container']} ${styles['puzzle-problem']}`}></div>
        <div className={`${styles['puzzle-container']} ${correctStyles}`}>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-1'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-2'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-3'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-4'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-5'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-6'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-7'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-8'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-9'></div>
        </div>
      </div>

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
        <div
          className={`${styles['puzzle-item']} ${styles['chunk-7']} value-7`}
          draggable
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onClick={onRotateAnswer}
          style={{ transform: 'rotate(270deg)' }}></div>
        <div
          className={`${styles['puzzle-item']} ${styles['chunk-9']} value-9`}
          draggable
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onClick={onRotateAnswer}
          style={{ transform: 'rotate(180deg)' }}></div>
        <div
          className={`${styles['puzzle-item']} ${styles['chunk-5']} value-5`}
          draggable
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onClick={onRotateAnswer}
          style={{ transform: 'rotate(90deg)' }}></div>
        <div
          className={`${styles['puzzle-item']} ${styles['chunk-8']} value-8`}
          draggable
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onClick={onRotateAnswer}
          style={{ transform: 'rotate(0deg)' }}></div>
        <div
          className={`${styles['puzzle-item']} ${styles['chunk-6']} value-6`}
          draggable
          onDragStart={onDragStartHandler}
          onDragEnd={onDragEndHandler}
          onClick={onRotateAnswer}
          style={{ transform: 'rotate(180deg)' }}></div>
      </div>
    </Fragment>
  );
};

export default Problem4;

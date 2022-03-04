import { FC, DragEvent, Fragment, useState, useEffect } from 'react';
import { MouseEvent as MouseEventClick } from 'react';
import styles from './problem-1.module.scss';

interface ProblemSolvingType {
  onDragStartHandler: (event: DragEvent<HTMLDivElement>) => void;
  onDragOverHandler: (event: DragEvent<HTMLDivElement>) => string;
  onDragEndHandler: (event: DragEvent<HTMLDivElement>) => void;
  onClickHandler: (event: MouseEventClick) => { classList: string; rotateVal: number };
}

const Problem1: FC<ProblemSolvingType> = ({
  onDragStartHandler,
  onDragOverHandler,
  onDragEndHandler,
  onClickHandler,
}) => {
  const [chunkOrder, setChunkOrder] = useState<{ order: number | null; rotateValue: number | null }[]>([]);

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

    if (element && rotateVal) {
      // Get order value
      const elementClass = element.getAttribute('class');
      const classValue = elementClass?.split(' ').filter((cls) => cls.includes('value'));

      // update chunk order value
      if (classValue) {
        const value = parseInt(classValue[0].replace('value-', ''));
        setChunkOrder((prevState) => {
          const newState = [...prevState];
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
    console.log(chunkOrder);

    if (answerIsCorrect) alert('Correct!');
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
        <div className={styles['puzzle-container']}>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-1'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-2'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-3'></div>
          <div className={styles['puzzle-box']} onDragOver={onDragOverAnswer} id='answer-box-4'></div>
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
      </div>
    </Fragment>
  );
};

export default Problem1;
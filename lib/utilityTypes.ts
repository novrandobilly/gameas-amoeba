import React, { DragEvent } from 'react';
import { MouseEvent as MouseEventClick } from 'react';

export interface answerType {
  [answerNumber: string]: {
    isCorrect: boolean;
    time: number | null;
  };
}

export interface ProblemSolvingType {
  onDragStartHandler: (event: DragEvent<HTMLDivElement>) => void;
  onDragOverHandler: (event: DragEvent<HTMLDivElement>) => string;
  onDragEndHandler: (event: DragEvent<HTMLDivElement>) => void;
  onClickHandler: (event: MouseEventClick) => { classList: string; rotateVal: number };
  setTestPhase: React.Dispatch<React.SetStateAction<number>>;
  setAnswerResult: React.Dispatch<React.SetStateAction<answerType>>;
}

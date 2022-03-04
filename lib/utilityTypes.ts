import React, { DragEvent } from 'react';
import { MouseEvent as MouseEventClick } from 'react';

export interface ProblemSolvingType {
  onDragStartHandler: (event: DragEvent<HTMLDivElement>) => void;
  onDragOverHandler: (event: DragEvent<HTMLDivElement>) => string;
  onDragEndHandler: (event: DragEvent<HTMLDivElement>) => void;
  onClickHandler: (event: MouseEventClick) => { classList: string; rotateVal: number };
  setTestPhase: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4 | 5 | 6>>;
}

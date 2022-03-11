export const NumericalData = () => {
  const question = {
    topLeft: [
      { ask: '12 + 3 x 4' },
      { ask: '18 + 5 x 2' },
      { ask: '6 x 30 : 3' },
      { ask: '72 : 3 x 5' },
      { ask: '48 - 3 x 2' },
    ],
    topRight: [
      { ask: '20 x 3 + 10' },
      { ask: '14 - 9 x 1' },
      { ask: '32 - 9 x 4' },
      { ask: '186 + 34 - 70' },
      { ask: '24 + 80 : 5' },
    ],
    bottomLeft: [
      { ask: '18 - 8 x 9' },
      { ask: '5 + 3 x 10' },
      { ask: '64 + 3 : 5' },
      { ask: '63 - 23 : 3' },
      { ask: '3 x 24 - 36' },
    ],
    bottomRight: [
      { ask: '15 x 6 : 7' },
      { ask: '20 + 3 x 2' },
      { ask: '196 + 5 - 98' },
      { ask: '5 x 5 x 2' },
      { ask: '2 + 3 x 8' },
    ],
  };

  const result = [70, 80, 60, 50, 40];
  const rightAnswer = ['topRight', 'bottomLeft', 'topLeft', 'bottomRight', 'topRight'];
  return { question, result, rightAnswer };
};

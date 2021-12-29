const getRandomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

type positions = {
  x: number;
  y: number;
};

const positionMatch = (a: positions, b: positions) =>
  a.x === b.x && a.y === b.y;

const getMinePositions = (boardSize: number, numOfMines: number) => {
  const minePositions: positions[] = [];

  while (minePositions.length < numOfMines) {
    const minePosition = {
      x: getRandomNum(0, boardSize),
      y: getRandomNum(0, boardSize),
    };

    if (!minePositions.some((p: positions) => positionMatch(p, minePosition))) {
      minePositions.push(minePosition);
    }
  }
  return minePositions;
};

const createBoard = (boardSize: number, numOfMines: number) => {
  const board = [];
  const minePositions = getMinePositions(boardSize, numOfMines);

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const cell = {
        x,
        y,
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        state: "hidden",
      };
      row.push(cell);
    }
    board.push(row);
  }
  return board;
};

export { createBoard };

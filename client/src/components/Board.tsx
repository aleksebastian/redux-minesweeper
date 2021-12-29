import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./board.module.css";

import { createBoard } from "./boardUtils";

import Cell from "./Cell";

const Board = () => {
  let boardSize = 4;
  let numOfMines = 2;
  let board = createBoard(boardSize, numOfMines);
  var style = { "--size": boardSize } as React.CSSProperties;
  let reactBoard: JSX.Element[] = [];

  useEffect(() => {
    // dispatch create redux state here
  }, []);

  console.log(board);

  board.forEach((row) => {
    row.forEach((cell) => {
      reactBoard.push(<Cell key={uuidv4()} />);
    });
  });

  return (
    <div style={style} className={styles.board}>
      {reactBoard}
    </div>
  );
};

export default Board;

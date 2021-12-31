import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./board.module.css";

import { useAppDispatch, useAppSelector } from "../hooks";
import { setBoard } from "./cellSlice";
import { selectGame, setGameStats } from "./gameSlice";

import { createBoard, nearbyCells } from "./boardUtils";

import Cell from "./Cell";

const Board = () => {
  let boardSize = 8;
  let numOfMines = 10;
  let board = createBoard(boardSize, numOfMines);
  var boardStyle = { "--size": boardSize } as React.CSSProperties;
  const dispatch = useAppDispatch();

  dispatch(setGameStats({ mineCount: numOfMines, size: boardSize }));
  dispatch(setBoard(board));

  return (
    <div style={boardStyle} className={styles.board}>
      {board.map((row) => {
        return row.map((cell) => {
          return <Cell key={uuidv4()} {...cell} />;
        });
      })}
    </div>
  );
};

export default Board;

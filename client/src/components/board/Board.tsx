import React from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./board.module.css";
import { setBoard } from "../cell/cellSlice";
import { selectGame } from "../gameState/gameSlice";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { createBoard } from "./boardUtils";
import Cell from "../cell/Cell";

const Board = () => {
  const { width, height, mineCount } = useAppSelector(selectGame);

  const board = createBoard(width, height, mineCount);
  const boardStyle = {
    "--width": width,
    "--height": height,
  } as React.CSSProperties;

  const dispatch = useAppDispatch();
  dispatch(setBoard(board));

  return (
    <div style={boardStyle} className={styles.board}>
      {board.map((row: any) => {
        return row.map((cell: any) => {
          return <Cell key={uuidv4()} {...cell} />;
        });
      })}
    </div>
  );
};

export default Board;

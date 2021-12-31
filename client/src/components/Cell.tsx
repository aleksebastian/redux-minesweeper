import React from "react";
import styles from "./cell.module.css";

import { useAppSelector, useAppDispatch } from "../hooks";
import { revealCell, markCell, gameOver, selectCells } from "./cellSlice";
import { updateMineCount, startGame, endGame, resetGame } from "./gameSlice";

type CellProps = {
  x: number;
  y: number;
  mine: boolean;
  state: string;
  number: number;
};

const Cell = ({ x, y }: CellProps) => {
  const dispatch = useAppDispatch();
  const reduxCellState = useAppSelector(selectCells);
  const { mine, state, number } = reduxCellState[x][y];
  const globalCellProps = { x, y, mine, state };

  const handleLeftClick = (e: any) => {
    e.preventDefault();
    dispatch(markCell(globalCellProps));
    dispatch(updateMineCount(state));
    dispatch(startGame());
  };

  const handleRightClick = (e: any) => {
    e.preventDefault();
    if (mine) {
      dispatch(gameOver());
      dispatch(endGame());
    } else {
      dispatch(revealCell(globalCellProps));
      dispatch(startGame());
    }
  };

  const cellStyles: any = {
    hidden: { backgroundColor: "rgb(250 250 300)", cursor: "pointer" },
    marked: { backgroundColor: "rgb(251 191 36)" },
    number: { backgroundColor: "rgb(209 213 219)" },
    mine: { backgroundColor: "rgb(220 38 38)" },
  };

  return (
    <div
      className={styles.cell}
      style={cellStyles[state]}
      onClick={handleRightClick}
      onContextMenu={handleLeftClick}
    >
      {number && !mine && state === "number" ? number : null}
    </div>
  );
};

export default Cell;

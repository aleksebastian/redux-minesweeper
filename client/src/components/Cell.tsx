import React from "react";
import styles from "./cell.module.css";

import { useAppSelector, useAppDispatch } from "../hooks";
import { revealCell, markCell, gameOver, selectCells } from "./cellSlice";

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
  };

  const handleRightClick = (e: any) => {
    e.preventDefault();
    if (mine) {
      dispatch(gameOver());
    } else {
      dispatch(revealCell(globalCellProps));
    }
  };

  const cellStyles: any = {
    hidden: { backgroundColor: "rgb(87 83 78)", cursor: "pointer" },
    marked: { backgroundColor: "rgb(251 191 36)" },
    number: { backgroundColor: "rgb(30 41 59)" },
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

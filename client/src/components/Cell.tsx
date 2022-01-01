import React, { MouseEvent, useEffect } from "react";
import styles from "./cell.module.css";

import { useAppSelector, useAppDispatch } from "../hooks";
import { revealCell, markCell, gameOver, selectCells } from "./cellSlice";
import { updateMineCount, startGame, endGame, wonGame } from "./gameSlice";

import { checkForWin } from "./boardUtils";

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
  const globalCellProps = { x, y, mine, state, number };

  const handleLeftClick = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(markCell(globalCellProps));
    dispatch(updateMineCount(state));
    dispatch(startGame());
  };

  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault();
    if (mine) {
      dispatch(gameOver());
      dispatch(endGame());
    } else {
      dispatch(revealCell(globalCellProps));
      dispatch(startGame());
    }
  };

  useEffect(() => {
    const hasWon = checkForWin(reduxCellState);
    if (hasWon) {
      dispatch(wonGame());
    }
  }, [state]);

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

import React, { MouseEvent, useEffect } from "react";
import styles from "./cell.module.css";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { revealCell, markCell, gameOver, selectCells } from "./cellSlice";
import {
  updateMineCount,
  startGame,
  endGame,
  wonGame,
  selectGame,
} from "../gameState/gameSlice";
import { checkForWin } from "../board/boardUtils";
import { CellProps } from "../cell/types";

const Cell = ({ x, y }: CellProps) => {
  const dispatch = useAppDispatch();
  const { started, lost, marking, currentMineCount } =
    useAppSelector(selectGame);
  const reduxCellState = useAppSelector(selectCells);
  const { mine, state, number } = reduxCellState[x][y];
  const globalCellProps = { x, y, mine, state, number };

  const handleLeftClick = (e: MouseEvent) => {
    e.preventDefault();
    if (currentMineCount > 0) {
      dispatch(markCell(globalCellProps));
      dispatch(updateMineCount(state));
      !started ? dispatch(startGame()) : null;
    }
  };

  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault();
    if (!marking) {
      if (mine) {
        dispatch(endGame());
        dispatch(gameOver());
      } else {
        dispatch(revealCell(globalCellProps));
        !started ? dispatch(startGame()) : null;
      }
    } else {
      dispatch(markCell(globalCellProps));
      dispatch(updateMineCount(state));
      !started ? dispatch(startGame()) : null;
    }
  };

  useEffect(() => {
    const hasWon = checkForWin(reduxCellState);
    if (hasWon) {
      dispatch(wonGame());
    }
  }, [state]);

  const cellStyles: { [k: string]: React.CSSProperties } = {
    hidden: { backgroundColor: "rgb(250 250 300)", cursor: "pointer" },
    marked: { backgroundColor: "rgb(251 191 36)", color: "red" },
    number: { backgroundColor: "rgb(209 213 219)" },
    mine: { backgroundColor: "rgb(220 38 38)" },
  };

  return (
    <div
      className={styles.cell}
      style={cellStyles[state]}
      onClick={!lost ? handleRightClick : undefined}
      onContextMenu={!lost ? handleLeftClick : undefined}
    >
      {number && !mine && (state === "number" || state === "marked")
        ? number
        : null}
    </div>
  );
};

export default Cell;

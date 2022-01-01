import React, { useState, useEffect } from "react";
import styles from "./gameState.module.css";

import { useAppSelector, useAppDispatch } from "../hooks";
import { selectGame, resetGame } from "./gameSlice";
import { setBoard } from "./cellSlice";

import { createBoard } from "./boardUtils";

interface Data {
  data: string | number;
}

const Display = ({ data }: Data) => {
  return <div className={styles.display}>{data}</div>;
};

const GameStatus = () => {
  const dispatch = useAppDispatch();
  const { currentMineCount, started, size, mineCount, won } =
    useAppSelector(selectGame);

  const [counter, setCounter] = useState(0);
  let timer: ReturnType<typeof setTimeout>;

  const btnVals = {
    default: "😴",
    started: "😬",
    reset: "😰",
    gameOver: "😭",
    win: "🥳",
  };

  const [currBtnVal, setBtnVal] = useState(btnVals.default);

  useEffect(() => {
    if (started) {
      timer = setTimeout(() => setCounter(counter + 1), 1000);
      if (currBtnVal !== btnVals.reset) {
        setBtnVal(btnVals.started);
      }
    } else {
      clearTimeout(timer);
      if (counter > 0) {
        if (won) {
          setBtnVal(btnVals.win);
        } else {
          setBtnVal(btnVals.gameOver);
        }
      }
    }
  }, [started, counter]);

  const handleClick = () => {
    clearTimeout(timer);
    dispatch(resetGame());
    setCounter(0);
    const board = createBoard(size, mineCount);
    dispatch(setBoard(board));
    setBtnVal(btnVals.default);
  };

  const handleHover = () => {
    if (started && currBtnVal === btnVals.reset) {
      setBtnVal(btnVals.started);
    } else if (started && currBtnVal === btnVals.started) {
      setBtnVal(btnVals.reset);
    }
  };

  return (
    <div className={styles.main}>
      <Display data={currentMineCount} />
      <button
        className={styles.button}
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        {currBtnVal}
      </button>
      <Display data={counter} />
    </div>
  );
};

export default GameStatus;

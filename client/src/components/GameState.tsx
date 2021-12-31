import React, { useState, useEffect } from "react";
import styles from "./gameState.module.css";

import { useAppSelector, useAppDispatch } from "../hooks";
import { selectGame, resetGame } from "./gameSlice";
import { setBoard } from "./cellSlice";

import { createBoard } from "./boardUtils";

const Display = ({ data }: any) => {
  return <div className={styles.display}>{data}</div>;
};

const GameStatus = (props: any) => {
  const dispatch = useAppDispatch();
  const { currentMineCount, started, size, mineCount } =
    useAppSelector(selectGame);

  const [counter, setCounter] = useState(0);
  let timer: any;

  const btnVals = {
    default: "😴",
    started: "😬",
    reset: "😰",
    gameOver: "😭",
    win: "🤯",
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
        setBtnVal(btnVals.gameOver);
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

  // let currentBtnVal = btnVal.default;

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

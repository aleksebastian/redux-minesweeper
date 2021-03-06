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
  return (
    <div className={styles.display}>
      <p className={styles.displayData}>{data}</p>
    </div>
  );
};

const GameStatus = () => {
  const dispatch = useAppDispatch();
  const { currentMineCount, started, size, mineCount, won, lost } =
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
  const [resultText, setResultText] = useState("");

  useEffect(() => {
    if (started) {
      timer = setTimeout(() => setCounter(counter + 1), 1000);
      if (currBtnVal !== btnVals.reset) {
        setBtnVal(btnVals.started);
      }
    } else {
      clearTimeout(timer);
      if (won) {
        setBtnVal(btnVals.win);
        setResultText("You won!");
      } else if (lost) {
        setBtnVal(btnVals.gameOver);
        setResultText("Game over");
      }
    }
  }, [started, counter, won, lost]);

  const handleClick = () => {
    clearTimeout(timer);
    dispatch(resetGame());
    setCounter(0);
    const board = createBoard(size, mineCount);
    dispatch(setBoard(board));
    setBtnVal(btnVals.default);
    setResultText("");
  };

  const handleHover = () => {
    if (started && currBtnVal === btnVals.reset) {
      setBtnVal(btnVals.started);
    } else if (started && currBtnVal === btnVals.started) {
      setBtnVal(btnVals.reset);
    }
  };

  return (
    <div>
      <p className={styles.resultText}>{resultText}</p>
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
    </div>
  );
};

export default GameStatus;

import React, { useState, useEffect } from "react";
import styles from "./gameState.module.css";

import { useAppSelector, useAppDispatch } from "../hooks";
import { selectGame, resetGame } from "./gameSlice";
import { selectCells, setBoard } from "./cellSlice";

import { createBoard, nearbyCells } from "./boardUtils";

const Display = ({ data }: any) => {
  return <div className={styles.display}>{data}</div>;
};

const GameStatus = (props: any) => {
  const dispatch = useAppDispatch();
  const { currentMineCount, started, size, mineCount } =
    useAppSelector(selectGame);

  const [counter, setCounter] = useState(0);
  let timer: any;

  useEffect(() => {
    if (started) {
      timer = setTimeout(() => setCounter(counter + 1), 1000);
    } else {
      clearTimeout(timer);
    }
  }, [started, counter]);

  const handleClick = () => {
    clearTimeout(timer);
    dispatch(resetGame());
    setCounter(0);
    const board = createBoard(size, mineCount);
    dispatch(setBoard(board));
  };

  return (
    <div className={styles.main}>
      <Display data={currentMineCount} />
      <button className={styles.button} onClick={handleClick}>{`:)`}</button>
      <Display data={counter} />
    </div>
  );
};

export default GameStatus;

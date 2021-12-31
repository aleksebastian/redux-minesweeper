import React, { useState, useEffect } from "react";
import styles from "./gameState.module.css";

import { useAppSelector, useAppDispatch } from "../hooks";
import { selectGame, resetGame } from "./gameSlice";
import { selectCells } from "./cellSlice";

const Display = ({ data }: any) => {
  return <div className={styles.display}>{data}</div>;
};

const GameStatus = (props: any) => {
  const dispatch = useAppDispatch();
  const { currentMineCount, started } = useAppSelector(selectGame);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (started) {
      setTimeout(() => setCounter(counter + 1), 1000);
    } else {
      setCounter(0);
    }
  }, [started, counter]);

  const handleClick = () => {
    dispatch(resetGame());
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

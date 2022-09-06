import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectGame, resetGame, setGameStats } from "../gameState/gameSlice";
import styles from "./settings.module.css";
import { IoMdSettings } from "react-icons/io";

const useDelayUnmount = (isMounted: boolean, delayTime: number) => {
  const [showDiv, setShowDiv] = useState(false);
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isMounted && !showDiv) {
      setShowDiv(true);
    } else if (!isMounted && showDiv) {
      timeoutId = setTimeout(() => setShowDiv(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, showDiv]);
  return showDiv;
};

const Settings = () => {
  const dispatch = useAppDispatch();
  const { currentMineCount, started, width, height, mineCount, won, lost } =
    useAppSelector(selectGame);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState({
    name: "easy",
    width: 9,
    height: 9,
    mines: 10,
  });
  const showDiv = useDelayUnmount(isMounted, 150);

  const mountedStyle = { animation: "inAnimation 150ms ease-in" };
  const unmountedStyle = {
    animation: "outAnimation 170ms ease-out",
  };

  const handleClick = () => {
    setIsMounted(!isMounted);
  };

  const handleNewGameClick = () => {
    dispatch(resetGame());
    setIsMounted(!isMounted);
    dispatch(
      setGameStats({
        mineCount: selectedDifficulty.mines,
        width: selectedDifficulty.width,
        height: selectedDifficulty.height,
      })
    );
  };

  const handleItemClick = (difficulty: string) => {
    if (difficulty === "easy") {
      setSelectedDifficulty({
        name: "easy",
        width: 9,
        height: 9,
        mines: 10,
      });
    } else if (difficulty === "medium") {
      setSelectedDifficulty({
        name: "medium",
        width: 16,
        height: 16,
        mines: 40,
      });
    } else if (difficulty === "hard") {
      setSelectedDifficulty({
        name: "hard",
        width: 16,
        height: 30,
        mines: 99,
      });
    } else if (difficulty === "custom") {
    }
  };

  return (
    <div className={styles.container}>
      {showDiv && (
        <nav
          className={styles.menu}
          style={isMounted ? mountedStyle : unmountedStyle}
        >
          <ul>
            <li className={`${styles.item} ${styles.header}`}>
              <span>Difficulty </span>{" "}
              <span className={styles.closeMenu} onClick={handleClick}>
                x
              </span>
            </li>
            <li
              className={styles.item}
              style={
                selectedDifficulty.name === "easy"
                  ? { backgroundColor: "rgb(11, 22, 54)" }
                  : { backgroundColor: "rgb(30 58 138)" }
              }
              onClick={() => handleItemClick("easy")}
            >
              Easy | <span className={styles.itemDetails}>9x9 - 10 💣s</span>
            </li>
            <li
              className={styles.item}
              style={
                selectedDifficulty.name === "medium"
                  ? { backgroundColor: "rgb(11, 22, 54)" }
                  : { backgroundColor: "rgb(30 58 138)" }
              }
              onClick={() => handleItemClick("medium")}
            >
              Medium |{" "}
              <span className={styles.itemDetails}>16x16 - 40 💣s</span>
            </li>
            <li
              className={styles.item}
              style={
                selectedDifficulty.name === "hard"
                  ? { backgroundColor: "rgb(11, 22, 54)" }
                  : { backgroundColor: "rgb(30 58 138)" }
              }
              onClick={() => handleItemClick("hard")}
            >
              Hard | <span className={styles.itemDetails}>16x30 - 99 💣s</span>
            </li>
            <li
              className={styles.item}
              onClick={() => handleItemClick("custom")}
            >
              Custom |{" "}
              <span className={styles.itemDetails}>16x30 - 99 💣s</span>
            </li>
            <li className={`${styles.item} ${styles.footer}`}>
              <button className={styles.btn} onClick={handleNewGameClick}>
                New game
              </button>
            </li>
          </ul>
        </nav>
      )}
      <div onClick={handleClick}>
        <IoMdSettings />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Settings;

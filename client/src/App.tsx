import React from "react";
import styles from "./app.module.css";

import { Provider } from "react-redux";
import store from "./store";

import GameState from "./components/gameState/GameState";
import Board from "./components/board/Board";
import ToggleSwitch from "./components/mobileToggle/ToggleSwitch";
import Settings from "./components/gameSettings/Settings";

const App = () => (
  <Provider store={store}>
    <div className={styles.main}>
      <h1 className={styles.header}>Minesweeper</h1>
      <GameState />
      <Board />
      <div className={styles.settings}>
        <Settings />
        <ToggleSwitch />
        <div className={styles.extra}></div>
      </div>
    </div>
  </Provider>
);

export default App;

// UNINSTALL UNREQUIRED DEPENDENCIES

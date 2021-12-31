import React from "react";
import styles from "./app.module.css";

import { Provider } from "react-redux";
import store from "./store";

import GameState from "./components/GameState";
import Board from "./components/Board";

const App = () => (
  <Provider store={store}>
    <div className={styles.main}>
      <h1 className={styles.header}>Minesweeper</h1>
      <GameState />
      <Board />
    </div>
  </Provider>
);

export default App;

// UNINSTALL UNREQUIRED DEPENDENCIES

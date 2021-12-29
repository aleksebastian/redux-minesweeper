import React from "react";

import Board from "./components/Board";

import styles from "./app.module.css";

const App = () => (
  <div className={styles.main}>
    <h1>Minesweeper</h1>
    <Board />
  </div>
);

export default App;

// UNINSTALL UNREQUIRED DEPENDENCIES

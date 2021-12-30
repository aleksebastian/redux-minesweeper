import React from "react";
import styles from "./app.module.css";

import { Provider } from "react-redux";
import store from "./store";

import Board from "./components/Board";

const App = () => (
  <Provider store={store}>
    <div className={styles.main}>
      <h1>Minesweeper</h1>
      <Board />
    </div>
  </Provider>
);

export default App;

// UNINSTALL UNREQUIRED DEPENDENCIES

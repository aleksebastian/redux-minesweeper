import React, { useState } from "react";
import styles from "./toggleSwitch.module.css";
import { useAppDispatch } from "../hooks";

import { setMarkingToggle } from "./gameSlice";

const ToggleSwitch = () => {
  const [isToggled, setToggled] = useState(false);
  const label = "mark mines";
  let toggleEmoji = isToggled ? "✏️" : "⛏️";
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    setToggled(!isToggled);
    dispatch(setMarkingToggle());
  };

  return (
    <div className={styles.container}>
      <div className={styles.labelText}>{label}</div>

      <div className={styles.toggleSwitch}>
        <input
          type="checkbox"
          className={styles.checkbox}
          name={label}
          id={label}
          onClick={handleToggle}
        />
        <label className={styles.label} htmlFor={label}>
          <span className={styles.inner}></span>
          <span className={styles.switch}>{toggleEmoji}</span>
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;

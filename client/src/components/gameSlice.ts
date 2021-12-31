import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: any = {
  game: {
    size: 0,
    mineCount: 0,
    currentMineCount: 0,
    started: false,
    reset: false,
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameStats: (state, action: PayloadAction<any>) => {
      state.game.mineCount = action.payload.mineCount;
      state.game.currentMineCount = action.payload.mineCount;
      state.game.size = action.payload.size;
    },
    startGame: (state) => {
      state.game.reset = false;
      state.game.started = true;
    },
    endGame: (state) => {
      state.game.started = false;
    },
    resetGame: (state) => {
      state.game.started = false;
      state.game.currentMineCount = state.game.mineCount;
      state.game.reset = true;
    },
    updateMineCount: (state, action: PayloadAction<any>) => {
      if (action.payload === "hidden") {
        let currMineCount = state.game.currentMineCount;
        state.game.currentMineCount = currMineCount - 1;
      } else {
        let currMineCount = state.game.currentMineCount;
        state.game.currentMineCount = currMineCount + 1;
      }
    },
  },
});

export const { setGameStats, startGame, endGame, resetGame, updateMineCount } =
  gameSlice.actions;

export const selectGame = (state: RootState) => state.game.game;

export default gameSlice.reducer;

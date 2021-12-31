import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type setGameStats = {
  size: number;
  mineCount: number;
};

type gameProps = {
  size: number;
  mineCount: number;
  currentMineCount: number;
  started: boolean;
  reset: boolean;
};

type game = {
  game: gameProps;
};

const initialState: game = {
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
    setGameStats: (state, action: PayloadAction<setGameStats>) => {
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
    updateMineCount: (state, action: PayloadAction<string>) => {
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

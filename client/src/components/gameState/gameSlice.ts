import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type setGameStats = {
  width: number;
  height: number;
  mineCount: number;
};

type gameProps = {
  width: number;
  height: number;
  mineCount: number;
  currentMineCount: number;
  started: boolean;
  reset: boolean;
  won: boolean;
  lost: boolean;
  marking: boolean;
};

type game = {
  game: gameProps;
};

const initialState: game = {
  game: {
    width: 9,
    height: 9,
    mineCount: 10,
    currentMineCount: 10,
    started: false,
    reset: false,
    won: false,
    lost: false,
    marking: false,
  },
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameStats: (state, action: PayloadAction<setGameStats>) => {
      state.game.mineCount = action.payload.mineCount;
      state.game.currentMineCount = action.payload.mineCount;
      state.game.width = action.payload.width;
      state.game.height = action.payload.height;
    },
    startGame: (state) => {
      state.game.reset = false;
      state.game.started = true;
    },
    endGame: (state) => {
      state.game.started = false;
      state.game.lost = true;
    },
    wonGame: (state) => {
      state.game.won = true;
      state.game.started = false;
    },
    resetGame: (state) => {
      const resetState = state.game.reset;

      if (!resetState) {
        state.game.started = false;
        state.game.won = false;
        state.game.lost = false;
        state.game.currentMineCount = state.game.mineCount;
        state.game.reset = true;
      } else {
        state.game.reset = false;
      }
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
    setMarkingToggle: (state) => {
      const currentMarkingState = state.game.marking;
      state.game.marking = !state.game.marking;
    },
  },
});

export const {
  setGameStats,
  startGame,
  endGame,
  resetGame,
  updateMineCount,
  wonGame,
  setMarkingToggle,
} = gameSlice.actions;

export const selectGame = (state: RootState) => state.game.game;

export default gameSlice.reducer;

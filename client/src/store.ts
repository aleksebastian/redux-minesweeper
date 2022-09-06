import { configureStore } from "@reduxjs/toolkit";
import cellsReducer from "./components/cell/cellSlice";
import gameReducer from "./components/gameState/gameSlice";

const store = configureStore({
  reducer: {
    cells: cellsReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

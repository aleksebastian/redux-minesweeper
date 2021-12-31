import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { nearbyCells } from "./boardUtils";

type cell = {
  x: number;
  y: number;
  mine: boolean;
  state: string;
  number: number;
};
type row = [cell];
type board = [row];

interface Cells {
  cells: board;
}

const initialState: Cells = {
  cells: [[{ x: 0, y: 0, mine: false, state: "hidden", number: 0 }]],
};

export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<any>) => {
      state.cells = action.payload;
    },
    markCell: (state, action: PayloadAction<cell>) => {
      const cell = action.payload;
      const cellState = state.cells[cell.x][cell.y].state;
      if (cellState === "hidden") {
        state.cells[cell.x][cell.y].state = "marked";
      } else if (cellState === "marked") {
        state.cells[cell.x][cell.y].state = "hidden";
      } else {
        return;
      }
    },
    revealCell: (state, action: PayloadAction<cell>) => {
      const revealCell = (cell = action.payload) => {
        const cellState = state.cells[cell.x][cell.y].state;

        if (cellState !== "hidden") {
          return;
        } else if (cell.mine) {
          state.cells[cell.x][cell.y].state = "mine";
          return;
        } else {
          state.cells[cell.x][cell.y].state = "number";
        }
        const adjacentCells = nearbyCells(state.cells, cell);
        const adjacentMines = adjacentCells.filter((cell) => cell.mine);

        if (!adjacentMines.length) {
          adjacentCells.forEach((cell) => revealCell(cell));
        } else {
          state.cells[cell.x][cell.y].number = adjacentMines.length;
        }
      };

      revealCell();
    },
    gameOver: (state) => {
      state.cells.forEach((row) => {
        row.forEach((cell) => {
          cell.state = cell.mine ? "mine" : "number";
          if (!cell.number) {
            const adjacentCells = nearbyCells(state.cells, cell);
            const adjacentMines = adjacentCells.filter((cell) => cell.mine);
            cell.number = adjacentMines.length;
          }
        });
      });
    },
  },
});

export const { setBoard, markCell, revealCell, gameOver } = cellsSlice.actions;

export const selectCells = (state: RootState) => state.cells.cells;

export default cellsSlice.reducer;

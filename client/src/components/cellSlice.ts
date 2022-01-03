import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { nearbyCells } from "./boardUtils";

import { CellProps } from "../types/cellTypes";

type row = [CellProps];
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
    markCell: (state, action: PayloadAction<CellProps>) => {
      const { x, y } = action.payload;
      const cellState = state.cells[x][y].state;
      if (cellState === "hidden") {
        state.cells[x][y].state = "marked";
      } else if (cellState === "marked") {
        state.cells[x][y].state = "hidden";
      } else {
        return;
      }
    },
    revealCell: (state, action: PayloadAction<CellProps>) => {
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
          if (cell.state === "marked" && !cell.mine) {
            cell.number = "X";
          } else {
            cell.state = cell.mine ? "mine" : cell.state;
          }
        });
      });
    },
  },
});

export const { setBoard, markCell, revealCell, gameOver } = cellsSlice.actions;

export const selectCells = (state: RootState) => state.cells.cells;

export default cellsSlice.reducer;

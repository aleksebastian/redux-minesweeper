import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import { nearbyCells } from "./boardUtils";

const initialState: any = {
  cells: {},
};

export const cellsSlice = createSlice({
  name: "cells",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<any>) => {
      state.cells = action.payload;
    },
    markCell: (state, action: PayloadAction<any>) => {
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
    revealCell: (state, action: PayloadAction<any>) => {
      const revealCell = (cell = action.payload) => {
        const cellState = state.cells[cell.x][cell.y].state;

        if (cellState !== "hidden") {
          return;
        } else if (cell.mine) {
          // state.cells.forEach((row: any) => console.log(row));
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
      state.cells.forEach((row: any) => {
        row.forEach((cell: any) => {
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

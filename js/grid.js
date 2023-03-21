import { Cell } from "./cell";

const GRID_SIZE = 4;
const GRID_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
  constructor(gridElement) {
    this.cells = [];
    for (let i = 0; i < GRID_COUNT; i++) {
      this.cells.push(
        new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE))
      );
    }

    this.cellsGroupedByColumn = this.groupCellsByColumn();
    this.cellsGroupedByReverseColumn = this.cellsGroupedByColumn.map((column) =>
      [...column].reverse()
    );
    this.cellsGroupedByRow = this.groupCellsByRow();
    this.cellsGroupedByReverseRow = this.cellsGroupedByRow.map((row) =>
      [...row].reverse()
    );
  }

  getRandomEmptyCell() {
    const emptyCells = this.cells.filter((cell) => cell.isEmpty());
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }

  groupCellsByColumn() {
    return this.cells.reduce((groupCells, cell) => {
      groupCells[cell.x] = groupCells[cell.x] || [];
      groupCells[cell.x][cell.y] = cell;
      return groupCells;
    }, []);
  }

  groupCellsByRow() {
    return this.cells.reduce((groupCells, cell) => {
      groupCells[cell.y] = groupCells[cell.y] || [];
      groupCells[cell.y][cell.x] = cell;
      return groupCells;
    }, []);
  }
}

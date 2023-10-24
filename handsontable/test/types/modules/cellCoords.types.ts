import {
  CellCoords,
} from 'handsontable/base';

const cellCoords = new CellCoords(1, 2);
const cellCoordsRTL = new CellCoords(1, 2, true);

{
  const isValid: boolean = cellCoords.isValid({
    countRows: 10,
    countCols: 20,
    countRowHeaders: 1,
    countColHeaders: 2,
  });
}
{
  const isValid: boolean = cellCoords.isValid({});
}
const isEqual: boolean = cellCoords.isEqual(cellCoordsRTL);
const isSouthEastOf: boolean = cellCoords.isSouthEastOf(cellCoordsRTL);
const isNorthWestOf: boolean = cellCoords.isNorthWestOf(cellCoordsRTL);
const isSouthWestOf: boolean = cellCoords.isSouthWestOf(cellCoordsRTL);
const isNorthEastOf: boolean = cellCoords.isNorthEastOf(cellCoordsRTL);
const normalizedCellCoords: CellCoords = cellCoords.normalize();
const clonedCellCoords: CellCoords = cellCoords.clone();
const cellCoordsAsObject: { row: number, col: number } = cellCoords.toObject();

import { mixin } from '../helpers/object';
import localHooks from './../mixins/localHooks';

/**
 * The Transformation class implements algorithms for transforming coordinates based on current settings
 * passed to the Handsontable. The class performs the calculations based on the renderable indexes.
 *
 * Transformation is always applied relative to the current selection.
 *
 * The class operates on a table size defined by the renderable indexes. If the `navigableHeaders`
 * option is enabled, the table size is increased by the number of row and/or column headers.
 * Because the headers are treated as cells as part of the table size (indexes always go from 0 to N),
 * the algorithm can be written as simply as possible (without new if's that distinguish the headers
 * logic).
 *
 * @class Transformation
 * @util
 */
class Transformation {
  /**
   * Instance of the SelectionRange, holder for visual coordinates applied to the table.
   *
   * @type {SelectionRange}
   */
  #range;
  /**
   * Additional options which define the state of the settings which can infer transformation and
   * give the possibility to translate indexes.
   *
   * @type {object}
   */
  #options;
  /**
   * Increases the table size by applying the offsets. The option is used by the `navigableHeaders`
   * option.
   *
   * @type {{ x: number, y: number }}
   */
  #offset = { x: 0, y: 0 };

  constructor(range, options) {
    this.#range = range;
    this.#options = options;
  }

  /**
   * Selects cell relative to the current cell (if possible).
   *
   * @param {number} rowDelta Rows number to move, value can be passed as negative number.
   * @param {number} colDelta Columns number to move, value can be passed as negative number.
   * @param {boolean} [createMissingRecords=false] If `true` the new rows/columns will be created if necessary. Otherwise, row/column will
   *                        be created according to `minSpareRows/minSpareCols` settings of Handsontable.
   * @returns {CellCoords} Visual coordinates after transformation.
   */
  transformStart(rowDelta, colDelta, createMissingRecords = false) {
    this.#setOffsetSize({
      x: this.#options.navigableHeaders() ? this.#options.countRowHeaders() : 0,
      y: this.#options.navigableHeaders() ? this.#options.countColHeaders() : 0,
    });

    const delta = this.#options.createCellCoords(rowDelta, colDelta);
    let visualCoords = this.#range.current().highlight;
    const highlightRenderableCoords = this.#options.visualToRenderableCoords(visualCoords);
    let rowTransformDir = 0;
    let colTransformDir = 0;

    this.runLocalHooks('beforeTransformStart', delta);

    if (highlightRenderableCoords.row !== null && highlightRenderableCoords.col !== null) {
      const { width, height } = this.#getTableSize();
      const { x, y } = this.#visualToZeroBasedCoords(visualCoords);
      const fixedRowsBottom = this.#options.fixedRowsBottom();
      const minSpareRows = this.#options.minSpareRows();
      const minSpareCols = this.#options.minSpareCols();
      const autoWrapRow = this.#options.autoWrapRow();
      const autoWrapCol = this.#options.autoWrapCol();

      const rawCoords = {
        row: y + delta.row,
        col: x + delta.col,
      };

      if (rawCoords.row >= height) {
        if (createMissingRecords && minSpareRows > 0 && fixedRowsBottom === 0) {
          this.runLocalHooks('insertRowRequire', this.#options.countRenderableRows());

        } else if (autoWrapCol) {
          const nextColumn = rawCoords.col + 1;

          rawCoords.row = rawCoords.row - height;
          rawCoords.col = nextColumn >= width ? nextColumn - width : nextColumn;
        }

      } else if (rawCoords.row < 0) {
        if (autoWrapCol) {
          const previousColumn = rawCoords.col - 1;

          rawCoords.row = height + rawCoords.row;
          rawCoords.col = previousColumn < 0 ? width + previousColumn : previousColumn;
        }
      }

      if (rawCoords.col >= width) {
        if (createMissingRecords && minSpareCols > 0) {
          this.runLocalHooks('insertColRequire', this.#options.countRenderableColumns());

        } else if (autoWrapRow) {
          const nextRow = rawCoords.row + 1;

          rawCoords.row = nextRow >= height ? nextRow - height : nextRow;
          rawCoords.col = rawCoords.col - width;
        }

      } else if (rawCoords.col < 0) {
        if (autoWrapRow) {
          const previousRow = rawCoords.row - 1;

          rawCoords.row = previousRow < 0 ? height + previousRow : previousRow;
          rawCoords.col = width + rawCoords.col;
        }
      }

      const coords = this.#options.createCellCoords(rawCoords.row, rawCoords.col);
      const { rowDir, colDir } = this.#clampCoords(coords);

      rowTransformDir = rowDir;
      colTransformDir = colDir;
      visualCoords = this.#zeroBasedToVisualCoords(coords);
    }

    this.runLocalHooks('afterTransformStart', visualCoords, rowTransformDir, colTransformDir);

    return visualCoords;
  }

  /**
   * Sets selection end cell relative to the current selection end cell (if possible).
   *
   * @param {number} rowDelta Rows number to move, value can be passed as negative number.
   * @param {number} colDelta Columns number to move, value can be passed as negative number.
   * @returns {CellCoords} Visual coordinates after transformation.
   */
  transformEnd(rowDelta, colDelta) {
    this.#setOffsetSize({
      x: this.#options.navigableHeaders() ? this.#options.countRowHeaders() : 0,
      y: this.#options.navigableHeaders() ? this.#options.countColHeaders() : 0,
    });

    const delta = this.#options.createCellCoords(rowDelta, colDelta);
    const cellRange = this.#range.current();
    const highlightRenderableCoords = this.#options.visualToRenderableCoords(cellRange.highlight);
    const visualCoords = cellRange.to.clone();
    let rowTransformDir = 0;
    let colTransformDir = 0;

    this.runLocalHooks('beforeTransformEnd', delta);

    if (highlightRenderableCoords.row !== null && highlightRenderableCoords.col !== null) {
      const { x, y } = this.#visualToZeroBasedCoords(cellRange.to);
      const rawCoords = {
        row: y + delta.row,
        col: x + delta.col,
      };
      const coords = this.#options.createCellCoords(rawCoords.row, rawCoords.col);
      const { rowDir, colDir } = this.#clampCoords(coords);

      rowTransformDir = rowDir;
      colTransformDir = colDir;

      const newVisualCoords = this.#zeroBasedToVisualCoords(coords);

      if (delta.row === 0 && delta.col !== 0) {
        visualCoords.col = newVisualCoords.col;

      } else if (delta.row !== 0 && delta.col === 0) {
        visualCoords.row = newVisualCoords.row;

      } else {
        visualCoords.row = newVisualCoords.row;
        visualCoords.col = newVisualCoords.col;
      }
    }

    this.runLocalHooks('afterTransformEnd', visualCoords, rowTransformDir, colTransformDir);

    return visualCoords;
  }

  /**
   * Sets the additional offset in table size that may occur when the `navigableHeaders` option
   * is enabled.
   *
   * @param {{x: number, y: number}} offset Offset as x and y properties.
   */
  #setOffsetSize({ x, y }) {
    this.#offset = { x, y };
  }

  /**
   * Clamps the coords to make sure they points to the cell (or header) in the table range.
   *
   * @param {CellCoords} zeroBasedCoords The coords object to clamp.
   * @returns {{rowDir: 1|0|-1, colDir: 1|0|-1}}
   */
  #clampCoords(zeroBasedCoords) {
    const { width, height } = this.#getTableSize();
    let rowDir = 0;
    let colDir = 0;

    if (zeroBasedCoords.row < 0) {
      rowDir = -1;
      zeroBasedCoords.row = 0;

    } else if (zeroBasedCoords.row > 0 && zeroBasedCoords.row >= height) {
      rowDir = 1;
      zeroBasedCoords.row = height - 1;
    }

    if (zeroBasedCoords.col < 0) {
      colDir = -1;
      zeroBasedCoords.col = 0;

    } else if (zeroBasedCoords.col > 0 && zeroBasedCoords.col >= width) {
      colDir = 1;
      zeroBasedCoords.col = width - 1;
    }

    return { rowDir, colDir };
  }

  /**
   * Gets the table size in number of rows with headers as "height" and number of columns with
   * headers as "width".
   *
   * @returns {{width: number, height: number}}
   */
  #getTableSize() {
    return {
      width: this.#offset.x + this.#options.countRenderableColumns(),
      height: this.#offset.y + this.#options.countRenderableRows(),
    };
  }

  /**
   * Translates the visual coordinates to zero-based ones.
   *
   * @param {CellCoords} visualCoords The visual coords to process.
   * @returns {{x: number, y: number}}
   */
  #visualToZeroBasedCoords(visualCoords) {
    const { row, col } = this.#options.visualToRenderableCoords(visualCoords);

    return {
      x: this.#offset.x + col,
      y: this.#offset.y + row,
    };
  }

  /**
   * Translates the zero-based coordinates to visual ones.
   *
   * @param {CellCoords} zeroBasedCoords The coordinates to process.
   * @returns {CellCoords}
   */
  #zeroBasedToVisualCoords(zeroBasedCoords) {
    zeroBasedCoords.col = zeroBasedCoords.col - this.#offset.x;
    zeroBasedCoords.row = zeroBasedCoords.row - this.#offset.y;

    return this.#options.renderableToVisualCoords(zeroBasedCoords);
  }
}

mixin(Transformation, localHooks);

export default Transformation;

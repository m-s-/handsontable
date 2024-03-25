import { IndexMapper } from './translations';
import { Events } from './pluginHooks';
import {
  CellValue,
  RowObject,
  SimpleCellCoords,
} from './common';
import {
  GridSettings,
  CellMeta,
  CellProperties,
} from './settings';
import CellCoords from './3rdparty/walkontable/src/cell/coords';
import CellRange from './3rdparty/walkontable/src/cell/range';
import { BaseEditor } from './editors/baseEditor';
import { BaseRenderer } from './renderers/base';
import { BaseValidator } from './validators/base';
import { Plugins } from './plugins';
import { CellType } from './cellTypes';
import { ShortcutManager } from './shortcuts';
import { FocusManager } from './focusManager';

type AlterActions = 'insert_row_above' | 'insert_row_below' |
                    'insert_col_start' | 'insert_col_end' |
                    'remove_row' | 'remove_col';

export default class Core {
  addHook<K extends keyof Events>(key: K, callback: Events[K] | Array<Events[K]>): void;
  addHookOnce<K extends keyof Events>(key: K, callback: Events[K] | Array<Events[K]>): void;
  alter(action: AlterActions, index?: number | Array<[number, number]>, amount?: number, source?: string, keepEmptyRows?: boolean): void;
  batch<R>(wrappedOperations: () => R): R;
  batchExecution<R>(wrappedOperations: () => R, forceFlushChanges: boolean): R;
  batchRender<R>(wrappedOperations: () => R): R;
  clear(): void;
  clearUndo(): void;
  colToProp(column: number): string | number;
  columnIndexMapper: IndexMapper;
  constructor(element: Element, options: GridSettings);
  container: HTMLElement;
  countCols(): number;
  countEmptyCols(ending?: boolean): number;
  countEmptyRows(ending?: boolean): number;
  countRenderedCols(): number;
  countRenderedRows(): number;
  countRows(): number;
  countSourceCols(): number;
  countSourceRows(): number;
  countVisibleCols(): number;
  countVisibleRows(): number;
  countRowHeaders(): number;
  countColHeaders(): number;
  deselectCell(): void;
  destroy(): void;
  destroyEditor(revertOriginal?: boolean, prepareEditorIfNeeded?: boolean): void;
  emptySelectedCells(): void;
  forceFullRender: boolean;
  getActiveEditor(): BaseEditor | undefined;
  getCell(row: number, column: number, topmost?: boolean): HTMLTableCellElement | null;
  getCellEditor(cellMeta: CellMeta): BaseEditor;
  getCellEditor(row: number, column: number): BaseEditor;
  getCellMeta(row: number, column: number): CellProperties;
  getCellMetaAtRow(row: number): CellProperties[];
  getCellRenderer(cellMeta: CellMeta): BaseRenderer;
  getCellRenderer(row: number, column: number): BaseRenderer;
  getCellsMeta(): CellProperties[];
  getCellValidator(cellMeta: CellMeta): BaseValidator | RegExp | undefined;
  getCellValidator(row: number, column: number): BaseValidator | RegExp | undefined;
  getColHeader(): Array<number | string>;
  getColHeader(column: number, headerLevel?: number): number | string;
  getColWidth(column: number): number;
  getCoords(element: Element | null): CellCoords;
  getCopyableData(row: number, column: number): string;
  getCopyableText(startRow: number, startColumn: number, endRow: number, endColumn: number): string;
  getData(row?: number, column?: number, row2?: number, column2?: number): CellValue[];
  getDataAtCell(row: number, column: number): CellValue;
  getDataAtCol(column: number): CellValue[];
  getDataAtProp(prop: string | number): CellValue[];
  getDataAtRow(row: number): CellValue[];
  getDataAtRowProp(row: number, prop: string): CellValue;
  getDataType(rowFrom: number, columnFrom: number, rowTo: number, columnTo: number): CellType | 'mixed';
  getDirectionFactor(): 1 | -1;
  getFocusManager(): FocusManager;
  getInstance(): Core;
  getPlugin<T extends keyof Plugins>(pluginName: T): Plugins[T];
  getPlugin(pluginName: string): Plugins['basePlugin'];
  getRowHeader(): Array<string | number>;
  getRowHeader(row: number): string | number;
  getRowHeight(row: number): number;
  getSchema(): RowObject;
  getSelected(): Array<[number, number, number, number]> | undefined;
  getSelectedLast(): number[] | undefined;
  getSelectedRange(): CellRange[] | undefined;
  getSelectedRangeLast(): CellRange | undefined;
  getSettings(): GridSettings;
  getShortcutManager(): ShortcutManager;
  getSourceData(row?: number, column?: number, row2?: number, column2?: number): CellValue[][] | RowObject[];
  getSourceDataArray(row?: number, column?: number, row2?: number, column2?: number): CellValue[][];
  getSourceDataAtCell(row: number, column: number): CellValue;
  getSourceDataAtCol(column: number): CellValue[];
  getSourceDataAtRow(row: number): CellValue[] | RowObject;
  getTranslatedPhrase(dictionaryKey: string, extraArguments: any): string | null;
  getValue(): CellValue;
  hasColHeaders(): boolean;
  hasHook(key: keyof Events): boolean;
  hasRowHeaders(): boolean;
  init(): () => void;
  isColumnModificationAllowed(): boolean;
  isDestroyed: boolean;
  isEmptyCol(column: number): boolean;
  isEmptyRow(row: number): boolean;
  isExecutionSuspended(): boolean;
  isListening(): boolean;
  isLtr(): boolean;
  isRedoAvailable(): boolean;
  isRenderSuspended(): boolean;
  isRtl(): boolean;
  isUndoAvailable(): boolean;
  listen(): void;
  loadData(data: CellValue[][] | RowObject[], source?: string): void;
  populateFromArray(row: number, column: number, input: CellValue[][], endRow?: number,
    endColumn?: number, source?: string, method?: 'shift_down' | 'shift_right' | 'overwrite'): void;
  propToCol<T extends number | string>(prop: string | number): T;
  redo(): void;
  refreshDimensions(): void;
  removeCellMeta(row: number, column: number, key: (keyof CellMeta) | string): void;
  removeHook<K extends keyof Events>(key: K, callback: Events[K]): void;
  render(): void;
  renderCall: boolean;
  resumeExecution(): void;
  resumeRender(): void;
  rootDocument: Document;
  rootElement: HTMLElement;
  rootWindow: Window;
  rowIndexMapper: IndexMapper;
  runHooks(key: keyof Events, p1?: any, p2?: any, p3?: any, p4?: any, p5?: any, p6?: any): any;
  scrollViewportTo(options: { row?: number, col?: number, verticalSnap?: 'top' | 'bottom', horizontalSnap?: 'start' | 'end', considerHiddenIndexes?: boolean }): boolean;
  scrollViewportTo(row?: number, column?: number, snapToBottom?: boolean, snapToRight?: boolean, considerHiddenIndexes?: boolean): boolean;
  scrollToFocusedCell(callback?: () => void): void;
  selectAll(includeRowHeaders?: boolean, includeColumnHeaders?: boolean, options?: { focusPosition?: SimpleCellCoords | CellCoords, disableHeadersHighlight?: boolean }): void;
  selectCell(row: number, column: number, endRow?: number, endColumn?: number, scrollToCell?: boolean, changeListener?: boolean): boolean;
  selectCellByProp(row: number, prop: string, endRow?: number, endProp?: string, scrollToCell?: boolean): boolean;
  selectCells(coords: Array<[number, number | string, number, number | string]> | CellRange[], scrollToCell?: boolean, changeListener?: boolean): boolean;
  selectColumns(startColumn: number | string, endColumn?: number | string, focusPosition?: number | SimpleCellCoords | CellCoords): boolean;
  selectRows(startRow: number, endRow?: number, focusPosition?: number | SimpleCellCoords | CellCoords): boolean;
  setCellMeta(row: number, column: number, key: string, val: any): void;
  setCellMeta<K extends keyof CellMeta>(row: number, column: number, key: K, val: CellMeta[K]): void;
  setCellMetaObject(row: number, column: number, prop: CellMeta): void;
  setDataAtCell(changes: Array<[number, number, CellValue]>, source?: string): void;
  setDataAtCell(row: number, column: number, value: CellValue, source?: string): void;
  setDataAtRowProp(changes: Array<[number, string | number, CellValue]>, source?: string): void;
  setDataAtRowProp(row: number, prop: string, value: CellValue, source?: string): void;
  setSourceDataAtCell(changes: Array<[number, string | number, CellValue]>, source?: string): void;
  setSourceDataAtCell(row: number, column: number | string, value: CellValue, source?: string): void;
  spliceCol(column: number, index: number, amount: number, ...elements: CellValue[]): void;
  spliceRow(row: number, index: number, amount: number, ...elements: CellValue[]): void;
  suspendExecution(): void;
  suspendRender(): void;
  table: HTMLTableElement;
  toHTML(): string;
  toPhysicalColumn(column: number): number;
  toPhysicalRow(row: number): number;
  toTableElement(): HTMLTableElement;
  toVisualColumn(column: number): number;
  toVisualRow(row: number): number;
  undo(): void;
  unlisten(): void;
  updateData(data: CellValue[][] | RowObject[], source?: string): void;
  updateSettings(settings: GridSettings, init?: boolean): void;
  validateCell(value: any, cellProperties: CellProperties, callback: (valid: boolean) => void, source: string): void;
  validateCells(callback?: (valid: boolean) => void): void;
  validateColumns(columns: number[], callback?: (valid: boolean) => void): void;
  validateRows(rows: number[], callback?: (valid: boolean) => void): void;
}

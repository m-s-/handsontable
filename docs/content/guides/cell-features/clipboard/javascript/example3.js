import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const container = document.querySelector('#example3');
const copyBtn = document.querySelector('#copy');
const cutBtn = document.querySelector('#cut');

const hot = new Handsontable(container, {
  rowHeaders: true,
  colHeaders: true,
  data: [
    ['A1', 'B1', 'C1', 'D1', 'E1'],
    ['A2', 'B2', 'C2', 'D2', 'E2'],
    ['A3', 'B3', 'C3', 'D3', 'E3'],
    ['A4', 'B4', 'C4', 'D4', 'E4'],
    ['A5', 'B5', 'C5', 'D5', 'E5'],
  ],
  outsideClickDeselects: false,
  height: 'auto',
  autoWrapRow: true,
  autoWrapCol: true,
  licenseKey: 'non-commercial-and-evaluation'
});

copyBtn.addEventListener('mousedown', () => {
  hot.selectCell(1, 1);
});

copyBtn.addEventListener('click', () => {
  document.execCommand('copy');
});

cutBtn.addEventListener('mousedown', () => {
  hot.selectCell(1, 1);
});

cutBtn.addEventListener('click', () => {
  document.execCommand('cut');
});

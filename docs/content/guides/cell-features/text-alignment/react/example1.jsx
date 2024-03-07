import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

// generate an array of arrays with dummy data
const data = new Array(100) // number of rows
  .fill()
  .map((_, row) => new Array(18) // number of columns
    .fill()
    .map((_, column) => `${row}, ${column}`)
  );

export const ExampleComponent = () => {
  return (
    <HotTable
      data={data}
      colWidths={100}
      height={320}
      rowHeaders={true}
      colHeaders={true}
      contextMenu={true}
      autoWrapRow={true}
      autoWrapCol={true}
      licenseKey="non-commercial-and-evaluation"
      mergeCells={[
        { row: 1, col: 1, rowspan: 3, colspan: 3 },
        { row: 3, col: 4, rowspan: 2, colspan: 2 }
      ]}
      className="htCenter"
      cell={[
        { row: 0, col: 0, className: 'htRight' },
        { row: 1, col: 1, className: 'htLeft htMiddle' },
        { row: 3, col: 4, className: 'htLeft htBottom' }
      ]}
      afterSetCellMeta={function(row, col, key, val) {
        console.log('cell meta changed', row, col, key, val);
      }}
    />
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example1'));
/* end:skip-in-preview */
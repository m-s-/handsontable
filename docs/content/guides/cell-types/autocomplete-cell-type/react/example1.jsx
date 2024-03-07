import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const colors = ['yellow', 'red', 'orange and another color', 'green',
    'blue', 'gray', 'black', 'white', 'purple', 'lime', 'olive', 'cyan'
  ];

  return (
    <HotTable
      autoWrapRow={true}
      autoWrapCol={true}
      licenseKey="non-commercial-and-evaluation"
      data={[
        ['BMW', 2017, 'black', 'black'],
        ['Nissan', 2018, 'blue', 'blue'],
        ['Chrysler', 2019, 'yellow', 'black'],
        ['Volvo', 2020, 'white', 'gray']
      ]}
      colHeaders={['Car', 'Year', 'Chassis color', 'Bumper color']}
      columns={[{
          type: 'autocomplete',
          source: ['BMW', 'Chrysler', 'Nissan', 'Suzuki', 'Toyota', 'Volvo'],
          strict: false
        },
        { type: 'numeric' },
        {
          type: 'autocomplete',
          source: colors,
          strict: false,
          visibleRows: 4
        },
        {
          type: 'autocomplete',
          source: colors,
          strict: false,
          trimDropdown: false
        }
      ]}
    />
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example1'));
/* end:skip-in-preview */
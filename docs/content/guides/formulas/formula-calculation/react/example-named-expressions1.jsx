import { useEffect, useRef, useState } from 'react';
import { HyperFormula } from 'hyperformula';
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = () => {
  const hotNamedExpressionsRef = useRef(null);
  const [namedExpressionValue, setNamedExpressionValue] = useState('=10 * Sheet1!$A$2');

  const data = [
    ['Travel ID', 'Destination', 'Base price', 'Price with extra cost'],
    ['154', 'Rome', 400, '=ROUND(ADDITIONAL_COST+C2,0)'],
    ['155', 'Athens', 300, '=ROUND(ADDITIONAL_COST+C3,0)'],
    ['156', 'Warsaw', 150, '=ROUND(ADDITIONAL_COST+C4,0)'],
  ];
  const inputChangeCallback = (event) => {
    setNamedExpressionValue(event.target.value);
  };
  let buttonClickCallback;

  useEffect(() => {
    const hotNamedExpressions = hotNamedExpressionsRef.current.hotInstance;
    const formulasPlugin = hotNamedExpressions.getPlugin('formulas');

    buttonClickCallback = (event) => {
      formulasPlugin.engine.changeNamedExpression('ADDITIONAL_COST', namedExpressionValue);

      hotNamedExpressions.render();
    };
  });

  return (
    <>
      <HotTable
        ref={hotNamedExpressionsRef}
        data={data}
        colHeaders={true}
        rowHeaders={true}
        height="auto"
        formulas={{
          engine: HyperFormula,
          namedExpressions: [
            {
              name: 'ADDITIONAL_COST',
              expression: 100,
            },
          ],
        }}
        autoWrapRow={true}
        autoWrapCol={true}
        licenseKey="non-commercial-and-evaluation"
      />
      <div className="controls">
        <input
          id="named-expressions-input"
          type="text"
          defaultValue={namedExpressionValue}
          onChange={(...args) => inputChangeCallback(...args)}
        />
        <button id="named-expressions-button" onClick={(...args) => buttonClickCallback(...args)}>
          Calculate the price
        </button>
      </div>
    </>
  );
};

/* start:skip-in-preview */
ReactDOM.render(<ExampleComponent />, document.getElementById('example-named-expressions1'));
/* end:skip-in-preview */
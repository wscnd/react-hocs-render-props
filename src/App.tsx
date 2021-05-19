import * as React from "react";
import _ from "lodash";

import * as Examples from "./examples";

const mapper = (value: [string, React.FunctionComponent<any>]) => {
  const [name, fn] = value;
  return {
    name,
    Component: fn,
  };
};

function App() {
  const [Components] = React.useState(() =>
    Object.entries(Examples).map(mapper),
  );

  const [selection, setSelection] = React.useState(Components[0]);

  const componentsByName = React.useMemo(
    () => _.keyBy(Components, "name"),
    [Components],
  );

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedName = event.target.value;
    const component = componentsByName[selectedName];
    setSelection(component);
  }

  function stringify(object: any) {
    return (
      <pre>
        <code>{JSON.stringify(object, null, 2)}</code>
      </pre>
    );
  }

  return (
    <div>
      <select name="select-components" id="select-1" onChange={onSelectChange}>
        {Components.map((c) => (
          <option key={c.name} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <div style={{ paddingTop: 30, border: "2px dotted black" }}>
        {selection ? <selection.Component /> : null}
      </div>

      <div>
        {stringify(componentsByName)}
        {stringify(selection)}
      </div>
    </div>
  );
}

export default App;

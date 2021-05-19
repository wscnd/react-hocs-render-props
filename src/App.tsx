import * as React from "react";
import _ from "lodash";

import * as Examples from "./examples";

const Components = [
  { name: "RenderProp FC", Component: Examples.RenderPropFC },
];

function App() {
  const [selection, setSelection] = React.useState(Components[0]);
  const componentsByName = React.useMemo(() => _.keyBy(Components, "name"), []);

  function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedName = event.target.value;
    const component = componentsByName[selectedName];
    setSelection(component);
  }
  console.log(componentsByName);

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
      <div>
        {stringify(componentsByName)}
        {stringify(selection)}
      </div>
    </div>
  );
}

export default App;

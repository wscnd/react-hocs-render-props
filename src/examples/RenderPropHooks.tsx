import * as React from "react";

/**
 * idea still from Eric Rasmussen talk at ReactEurope 2020 https://www.youtube.com/watch?v=pn0pIgdQvhU
 */

type UseCount = {
  count: number;
  onClickHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

type ColorProp = {
  color: React.CSSProperties["color"];
};

const baseStyle = {
  width: 100,
  height: 100,
  fontSize: 30,
};

const Counter: React.FunctionComponent<UseCount & ColorProp> = ({
  count,
  onClickHandler,
  color,
}) => {
  return (
    <button style={{ ...baseStyle, color }} onClick={onClickHandler}>
      {count}
    </button>
  );
};

const useCount = (): UseCount => {
  const [count, setCount] = React.useState(0);

  const onClickHandler = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      setCount((c) => c + 1);
    },
    [],
  );
  return { count, onClickHandler };
};

type WithCountChild = {
  children: React.FunctionComponent<UseCount>;
};

const WithCount: React.FunctionComponent<WithCountChild> = ({ children }) => {
  const injectedState = useCount();
  return children(injectedState);
};

const RenderPropHooks = () => {
  return (
    <div>
      <WithCount>
        {(state) => <Counter {...state} color="darkgoldenrod" />}
      </WithCount>
      <WithCount>
        {(state) => <Counter {...state} color="chartreuse" />}
      </WithCount>
    </div>
  );
};

export { RenderPropHooks };

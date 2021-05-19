import * as React from "react";

/**
 * idea from Eric Rasmussen talk at ReactEurope 2020 https://www.youtube.com/watch?v=pn0pIgdQvhU
 */

type CountProps = {
  count: number;
  onClickHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

type WrapperProps = {
  children?: React.FunctionComponent<CountProps>;
};

const baseStyle = {
  width: 100,
  height: 100,
  fontSize: 30,
};

const Counter1: React.FunctionComponent<CountProps> = ({
  count,
  onClickHandler,
}) => {
  return (
    <button style={{ ...baseStyle, color: "peru" }} onClick={onClickHandler}>
      {count}
    </button>
  );
};

const Counter2: React.FunctionComponent<CountProps> = ({
  count,
  onClickHandler,
}) => {
  return (
    <button
      style={{ ...baseStyle, color: "chartreuse" }}
      onClick={onClickHandler}
    >
      {count}
    </button>
  );
};

const Wrapper: React.FunctionComponent<WrapperProps> = (props) => {
  const [count, setCount] = React.useState(0);

  function onClickHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    event.preventDefault();
    setCount((c) => c + 1);
  }

  console.log(props.children);

  return props.children ? (
    <div>{props.children({ count, onClickHandler })}</div>
  ) : null;
};

function withCount<T>(Component: React.ComponentType<T & CountProps>) {
  return (props: T) => {
    console.log(Component);
    return (
      <Wrapper>
        {({ count, onClickHandler }) => (
          <Component {...props} count={count} onClickHandler={onClickHandler} />
        )}
      </Wrapper>
    );
  };
}

/**
 * This is the REAL DEAL
 */

const WithCount1 = withCount(Counter1);
const WithCount2 = withCount(Counter2);

const RenderPropHOC = () => {
  return (
    <div>
      <WithCount1 />
      <WithCount2 />
    </div>
  );
};
export { RenderPropHOC };

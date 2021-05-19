import * as React from "react";

/**
 * idea from https://www.youtube.com/watch?v=3IdCQ7QAs38
 */

type CountProps = {
  count: number;
  onClickHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
};

type WrapperProps = {
  render?: (args: CountProps) => React.ReactNode;
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

  if (props.render) {
    return <div>{props.render({ count, onClickHandler })}</div>;
  }

  if (props.children) {
    return (
      props.children && <div>{props.children({ count, onClickHandler })}</div>
    );
  }

  return null;
};

const RenderPropFC2: React.FunctionComponent = () => {
  return (
    <div>
      <Wrapper>
        {({ count, onClickHandler }) => (
          <Counter1 count={count} onClickHandler={onClickHandler} />
        )}
      </Wrapper>
      <Wrapper
        render={({ count, onClickHandler }: CountProps) => (
          <Counter2 count={count} onClickHandler={onClickHandler} />
        )}
      >
        {() => <h1>{"This is a text"}</h1>}
      </Wrapper>
    </div>
  );
};

export { RenderPropFC2 };

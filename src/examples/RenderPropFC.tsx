import * as React from "react";

type MouseXY = {
  x: number;
  y: number;
};

const Cat: React.FunctionComponent<{ mouse: MouseXY }> = ({ mouse }) => {
  return (
    <img
      src="cat.jpeg"
      alt="cat"
      style={{ position: "absolute", left: mouse.x, top: mouse.y }}
    />
  );
};

type MouseProps = {
  render: (state: MouseXY) => React.ReactNode;
};
const Mouse: React.FunctionComponent<MouseProps> = (props) => {
  const [state, setState] = React.useState<MouseXY>({ x: 0, y: 0 });

  function handleMouseMovement(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    setState({
      x: event.clientX,
      y: event.clientY,
    });
  }
  return (
    <div style={{ height: "100vh" }} onMouseMove={handleMouseMovement}>
      {props.render(state)}
    </div>
  );
};

const MouseTracking: React.FunctionComponent = () => {
  return (
    <div>
      <h1>Move the mouse!!!!</h1>
      <Mouse render={(mouse) => <Cat mouse={mouse} />} />
    </div>
  );
};

const RenderPropFC: React.FunctionComponent = () => {
  return <MouseTracking />;
};

export { RenderPropFC };

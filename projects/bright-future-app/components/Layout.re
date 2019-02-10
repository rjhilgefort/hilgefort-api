let component = ReasonReact.statelessComponent("Layout");

let make = (children) => {
  ...component,
  render: (_self) =>
    <div>
      ...children
    </div>
};

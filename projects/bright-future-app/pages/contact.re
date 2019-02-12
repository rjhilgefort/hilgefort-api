let component = ReasonReact.statelessComponent("Contact");

open Util;

let make = (_children) => {
  ...component,
  render: (_self) => MUI.(
    <Layout>
      <p>{"This is the about page." |> str}</p>
    </Layout>
  )
};

let default = ReasonReact.wrapReasonForJs(~component, (_jsProps) => make([||]));

// https://github.com/zeit/next.js/tree/master/examples/with-reasonml
let component = ReasonReact.statelessComponent("Index");

let str = ReasonReact.string;

let make = (~onServer, _children) => {
  ...component,
  render: _self => {
    let onServerStr = onServer 
      |> string_of_bool 
      |> x => {j|onServer: $x|j} 
      |> str;

    <Layout>
      <Header />
      <p>{onServerStr}</p>
    </Layout>
  }
};

let default = ReasonReact.wrapReasonForJs(
  ~component, 
  jsProps => make(~onServer=jsProps##onServer, [||])
);
open Util;

let component = RR.statelessComponent("Index");

let make = (~onServer, _children) => {
  ...component,
  render: _self => {
    let onServerStr = onServer |> string_of_bool 

    MUI.(
      <Layout>
        <Header />
        <Button variant=`Contained color=`Secondary>"HI"</Button>
        <p>{{j|onServer: $onServerStr|j} |> str}</p>
      </Layout>
    )
  }
};

let default = RR.wrapReasonForJs(
  ~component, 
  jsProps => make(~onServer=jsProps##onServer, [||])
);
open Util;
let component = RR.statelessComponent("index");

let make = _children => {
  ...component,
  render: _self =>
    <div>
      <h1>("Hi people" |> str)</h1>
      <p>("Now go build something great." |> str)</p>
      <GatsbyLink to_="/page-2/">("Go to page 2" |> str)</GatsbyLink>
    </div>
};

let default =
  RR.wrapReasonForJs(
    ~component, 
    jsProps => make(jsProps##children)
  );
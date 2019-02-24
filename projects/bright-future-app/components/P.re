open Util

let component = RR.statelessComponent("P");
let make =
    (
      ~className=?,
      children,
    ) => {
  ...component,
  render: _self =>
    <p ?className>
      {children |> Belt.Array.get(_, 0) |> str_of_option}
    </p>
};

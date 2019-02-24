open Util

let component = RR.statelessComponent("Span");
let make =
    (
      ~className=?,
      children,
    ) => {
  ...component,
  render: _self =>
    <span ?className>
      {children |> Belt.Array.get(_, 0) |> str_of_option}
    </span>
};

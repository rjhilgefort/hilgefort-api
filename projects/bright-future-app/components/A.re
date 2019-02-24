open Util;

module S = {
  open Css;

  let a = style([textDecoration(`none)]);
};

let component = RR.statelessComponent("A");
let make = (~className=?, ~href=?, children) => {
  ...component,
  render: _self => {
    let className' = classNameCombine(~a=S.a, ~b=?className, ());

    <a className=className' ?href> ...children </a>;
  },
};

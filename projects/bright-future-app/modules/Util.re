let str = RR.string

let str_of_option = fun
  | Some(x) => x |> str
  | None => "" |> str

/*
TODO: This might be able to be removed:
https://material-ui.com/customization/overrides/
https://github.com/minima-app/re-classnames
*/
let classNames = Cn.make;

let string_of_hex = fun
  | `hex(x) => {j|#$x|j}

let classNameCombine = (~a, ~b=?, ()) =>
  switch b {
  | Some(x) => Css.merge([a, x])
  | None => a
  };

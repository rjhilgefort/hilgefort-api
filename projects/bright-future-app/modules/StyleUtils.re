open Css;
open Rationale.Function;

let list_of = x => [x];
let style_of_rule = rule => rule ||> list_of ||> style;

let marginRight = style_of_rule(marginRight)
let paddingBottom = style_of_rule(paddingBottom)

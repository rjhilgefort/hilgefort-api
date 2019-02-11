open Util;
open Css;

global("body", [
  margin(px(0)),
]);

let primary = orange;
let secondary = blue;
let white = white;

let theme =
  MaterialUi_Theme.create(
    MaterialUi_ThemeOptions.(
      make(
        ~typography=Typography.make(~useNextVariants=true, ()),
        ~palette=PaletteOptions.make(
          ~primary=Primary.make(~main=primary |> string_of_hex, ()),
          ~secondary=Secondary.make(~main=secondary |> string_of_hex, ()),
          (),
        ),
        (),
      )
    ),
  );

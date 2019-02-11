module Styles = {
  open Css;
  let layout = style([
    width(auto),
    marginTop(px(25)),
    marginLeft(px(100)),
    marginRight(px(100)),
    // TODO: Need to handle smaller screens
  ]);
};

let component = RR.statelessComponent("Layout");

let make = (children) => {
  ...component,
  render: (_self) => MUI.(
    <CssBaseline>
      <MuiThemeProvider theme=AppStyles.theme>
        <Header />
        <main className=Styles.layout>
          ...children
        </main>
      </MuiThemeProvider>
    </CssBaseline>
  )
};

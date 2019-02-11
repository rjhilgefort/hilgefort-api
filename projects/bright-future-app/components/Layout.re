module Styles = {
  open Css;
  open AppStyles;

  let appBar = style([
    padding2(~v=px(0), ~h=px(25)),
    backgroundColor(primary) |> important,
    position(`relative),
    color(white) |> important,
    selector("button", [
      margin2(~v=px(0), ~h=px(20)),
      hover([
        border(px(1), `solid, white),
        borderBottom(px(3), `solid, white),
      ])
    ])
  ]);

  let toolbarTitle = style([
    flex(1),
  ]);

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
        <AppBar position=`Static className=Styles.appBar>
          <Toolbar>
            // TODO: Icon goes here
            <Typography variant=`H6 color=`Inherit className={Styles.toolbarTitle}>
              {"Bright Future Child Enrichment Center"}
            </Typography>
            <Button color=`Inherit>
              {"Home"}
            </Button>
            <Button color=`Inherit variant=`Outlined>
              {"Contact"}
            </Button>
          </Toolbar>
          // TODO: Here's how an icon would work
          // <IconButton className="menu-button" color=`Inherit>
          //   <MUII.Home/>
          // </IconButton>
        </AppBar>
        <main className=Styles.layout>
          ...children
        </main>
      </MuiThemeProvider>
    </CssBaseline>
  )
};

module Styles = {
  open Css;

  let appBar = style([
    backgroundColor(AppStyles.primary) |> important
  ]);
};

let component = RR.statelessComponent("Layout");

let make = (children) => {
  ...component,
  render: (_self) => MUI.(
    <CssBaseline>
      <div className=Styles.appBar>
        <AppBar position=`Static color=`Primary className=Styles.appBar>
          <Toolbar>
            <IconButton className="menu-button" color=`Inherit>
              <MUII.Menu/>
            </IconButton>
            <Typography variant=`H6 color=`Inherit>
              {"News"}
            </Typography>
            <Button color=`Inherit>
              {"Login"}
            </Button>
          </Toolbar>
        // position="static" color="default" className={classes.appBar}>
          // <Toolbar>
          //   <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          //     Company name
          //   </Typography>
          //   <Button>Features</Button>
          //   <Button>Enterprise</Button>
          //   <Button>Support</Button>
          //   <Button color="primary" variant="outlined">
          //     Login
          //   </Button>
          // </Toolbar>
        </AppBar>
      </div>
      <div>
        ...children
      </div>
    </CssBaseline>
  )
};


module S = {
  open Css;
  module AS = AppStyles;
  let appBar = style([
    padding2(~v=px(0), ~h=px(20)),
    backgroundColor(AS.primary) |> important,
    position(`relative),
    color(AS.white) |> important,
    selector("button.nav-button", [
      margin2(~v=px(0), ~h=px(10)),
      hover([
        border(px(1), `solid, AS.white),
        borderBottom(px(3), `solid, AS.white),
      ])
    ])
  ]);

  let toolbarTitle = style([
    flex(1),
    fontWeight(`extraBold) |> important,
  ]);

  let logoIcon = style([
    marginRight(px(10)),
  ]);
};

module NavButton {
  let component = RR.statelessComponent("NavButton");
  let make = (~href: string, children) => {
    ...component,
    render: (_self) => MUI.(
      <Next.Link href={href}>
        <Button className="nav-button" color=`Inherit variant=`Outlined>
          ...children
        </Button>
      </Next.Link>
    )
  }
}

module Image {
  let component = RR.statelessComponent("Image");
  let make = (~src, _children) => {
    ...component,
    render: (_self) =>
      <span className="image main"><img src={src} alt="" /></span>
  }
}

let component = RR.statelessComponent("Header");
let make = (_children) => {
  ...component,
  render: (_self) => MUI.(
    <AppBar position=`Static className=S.appBar>
      <Toolbar>
        // <Image src="./foo.jpg" />
        <Icon className={S.logoIcon} color=`Inherit>
          <MUII.ChildFriendly />
        </Icon>
        <Typography variant=`H6 color=`Inherit className={S.toolbarTitle}>
          {"Bright Future Child Enrichment Center"}
        </Typography>
        <NavButton href="/">"Home"</NavButton>
        <NavButton href="/contact">{"Contact"}</NavButton>
      </Toolbar>
    </AppBar>
  )
};

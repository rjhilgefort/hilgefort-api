open Util;

module Styles = {
  open Css;

  let textFieldMargin = 10;

  let contactGroup = style([
    display(`flex),
    justifyContent(`spaceBetween),
    selector("> div", [
      marginLeft(px(textFieldMargin)),
      flexGrow(1.),
    ]),
  ]);
  let messageGroup = style([
    selector("> div", [
      marginLeft(px(textFieldMargin)),
      marginRight(px(textFieldMargin)),
    ])
  ])
};

module ContactTextField {
  let component = RR.statelessComponent("ContactTextField");
  let make = (
    ~label: string,
    ~margin=`Normal,
    ~variant=`Outlined,
    ~multiline=false,
    ~fullWidth=false,
    _children,
  ) => {
    ...component,
    render: (_self) => MUI.(
      <TextField 
        margin=margin 
        variant=variant 
        multiline=multiline
        rows=`Int(5)
        fullWidth=fullWidth
        label={label |> str} 
      />
    )
  }
}

let component = ReasonReact.statelessComponent("Contact");
let make = (_children) => {
  ...component,
  render: (_self) => MUI.(
    <Layout>
      <Grid container={true} spacing={V24}>
        <Grid item={true} xs={V6}>
          <p>{"HI" |> str}</p>
        </Grid>
        <Grid item={true} xs={V6}>
          <Grid container={true} spacing={V24}>
            <Grid item={true} xs={V12} className={Styles.contactGroup}>
              <ContactTextField label={"Full Name"}/>
              <ContactTextField label={"Email"}/>
              <ContactTextField label={"Phone"}/>
            </Grid>
            <Grid item={true} xs={V12} className={Styles.messageGroup}>
              <ContactTextField label={"Message..."} multiline={true} fullWidth={true}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
};

let default = ReasonReact.wrapReasonForJs(~component, (_jsProps) => make([||]));

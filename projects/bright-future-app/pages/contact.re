open Util;

module Styles = {
  open Css;

  let formGroup = style([
    selector("> div", [
      marginLeft(px(5)),
      marginRight(px(5)),
    ]),
  ]);
};

module ContactTextField {
  let component = RR.statelessComponent("ContactTextField");
  let make = (
    ~label: string,
    ~margin=`Normal,
    ~variant=`Filled,
    _children,
  ) => {
    ...component,
    render: (_self) => MUI.(
      <TextField margin=margin variant=variant label={label |> str} />
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
          <FormGroup row={false} className={Styles.formGroup}>
            <ContactTextField label={"Full Name"}/>
            <ContactTextField label={"Email"}/>
            <ContactTextField label={"Phone"}/>
          </FormGroup>
        </Grid>
      </Grid>
    </Layout>
  )
};

let default = ReasonReact.wrapReasonForJs(~component, (_jsProps) => make([||]));

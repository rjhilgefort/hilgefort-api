open Util;
module SU = StyleUtils;

module ContactTextField = {
  let component = RR.statelessComponent("ContactTextField");
  let make =
      (
        ~label: string,
        ~margin=`Normal,
        ~variant=`Outlined,
        ~multiline=false,
        ~fullWidth=true,
        ~className=?,
        _children,
      ) => {
    ...component,
    render: _self =>
      MUI.(
        <TextField
          margin
          variant
          multiline
          rows={`Int(5)}
          fullWidth
          ?className
          label={label |> str}
        />
      ),
  };
};

module ContactInfoButton = {
  module S {
    open Css;

    let style = style([
      marginBottom(px(25)) |> important,
      selector("span:first-child > svg", [
        marginRight(px(10)),
      ])
    ])
  };

  let component = RR.statelessComponent("ContactTextField");
  let make =
      (
        ~color=`Primary,
        ~variant=`Contained,
        ~href,
        ~className=?,
        children,
      ) => {
    ...component,
    render: _self => {
      let className' = classNameCombine(~a=S.style, ~b=?className, ());
      MUI.(
        <Button
          className=className'
          color=color
          variant=variant
          href=href>
          ...children
        </Button>
      )
    }
  };
};

module S = {
  open Css;

  let pageContainer =
    style([
      height(px(600)),
      padding2(~v=`zero, ~h=px(100)),
      marginTop(px(50)),
    ]);

  let contactFormPanel = style([display(`flex), flexDirection(`column)]);
  let contactInfoPanel = style([display(`flex), flexDirection(`column)]);

  let contact =
    style([
      display(`flex),
      justifyContent(`spaceBetween),
      children([flexBasis(pct(31.))]),
    ]);

  let message = style([]);

  let submit =
    style([
      marginTop(px(16)) |> important,
      marginBottom(px(8)) |> important,
    ]);
};

let component = ReasonReact.statelessComponent("Contact");
let make = _children => {
  ...component,
  render: _self =>
    MUI.(
      <Layout>
        <Grid container=true spacing=V24 className=S.pageContainer>
          <Grid item=true xs=V7 className=S.contactFormPanel>
            <Typography variant=`H4 color=`Primary gutterBottom=true>
              "Get In Touch"
            </Typography>
            <div className=S.contact>
              <ContactTextField label="Full Name" />
              <ContactTextField label="Email" />
              <ContactTextField label="Phone" />
            </div>
            <ContactTextField
              label="Message..."
              multiline=true
              fullWidth=true
              className=S.message
            />
            <Button variant=`Contained color=`Primary className=S.submit>
              "Submit"
            </Button>
          </Grid>
          <Grid item=true xs=V5 className=S.contactInfoPanel>
            <Typography
              variant=`H4
              color=`Primary
              gutterBottom=true
              className={SU.paddingBottom(Css.em(0.45))}>
              "Connect"
            </Typography>
            <ContactInfoButton href="mailto:brightfuturecec@gmail.com">
              <MUII.Email />
              {"Email: brightfuturecec@gmail.com" |> str}
            </ContactInfoButton>
            <ContactInfoButton href="tel:8593413350">
              <MUII.Phone />
              {"+1 (859) 341-3350" |> str}
            </ContactInfoButton>
          </Grid>
        </Grid>
      </Layout>
    ),
};

let default = ReasonReact.wrapReasonForJs(~component, _jsProps => make([||]));

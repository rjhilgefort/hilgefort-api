let component = RR.statelessComponent("Header");

let styles = ReactDOMRe.Style.make(~marginRight="10px", ());

let make = (_children) => {
  ...component,
  render: (_self) =>
    <div>
      <Next.Link href="/">
        <a style=styles> (RR.string("Home")) </a>
      </Next.Link>
      <Next.Link href="/about">
        <a style=styles> (RR.string("About")) </a>
      </Next.Link>
    </div>
};

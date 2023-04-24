// import { makeStyles } from "@mui/styles";
import { Box, Container, Divider, Grid } from "@mui/material";
import get from "lodash.get";
import upperFirst from "lodash.upperfirst";
import camelCase from "lodash.camelcase";
import { RichText, UnknownComponent } from ".";
import sections from "./footerSections";

/*styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.grey[200],
    marginTop: theme.spacing(2),
    paddingBottom: theme.mixins.toolbar.minHeight
  },
  copyright: {
    margin: 0,
    padding: theme.spacing(1),
    textAlign: "center"
  }
}));
*/
function Footer(props) {
  const footerSections = get(props, "data.config.item.elements.footer_sections.linkedItems", []);
  const classes = {};

  return (
    <Box className={classes.root}>
      <Container>
        <footer>
          {footerSections.length > 0 && (
            <Grid container spacing={2} >
              {footerSections.map((section, index) => {
                const contentType = upperFirst(camelCase(get(section, "system.type", null)));
                const Component = sections[contentType];

                if (process.env.NODE_ENV === "development" && !Component) {
                  console.error(`Unknown section component for section content type: ${contentType}`);
                  return (
                    <Grid item xs={12} sm={6} md={3} key={index} >
                      <UnknownComponent {...props}>
                        <pre>{JSON.stringify(section.system, undefined, 2)}</pre>
                      </UnknownComponent>
                    </Grid>
                  );
                }

                return (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Component  {...props} section={section} />
                  </Grid>
                );
              })
              }
            </Grid>
          )}

          {get(props, "data.config.copyright.value", null) && (
            <div className={classes.copyright}>
              <Divider />
              <RichText
                {...props}
                richTextElement={get(props, "data.config.copyright")}
              />
            </div>
          )}
        </footer>
      </Container>
    </Box>
  );
}

export default Footer;

// import { makeStyles } from "@mui/styles";
import { Box, Container, Divider, Grid } from "@mui/material";
import get from "lodash.get";
import upperFirst from "lodash.upperfirst";
import camelCase from "lodash.camelcase";
import { RichText, UnknownComponent } from ".";
import sections from "./footerSections";

function Footer(props) {
  const footerSections = get(props, "data.config.item.elements.footer_sections.linkedItems", []);
  const classes = {};

  return (
    <Box sx={{
      flexGrow: 1,
      background: theme => theme.palette.grey[200],
      marginTop: theme => theme.spacing(2),
    }}>
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
            <Box sx={{
              margin: 0,
              padding: theme => theme.spacing(1),
              textAlign: "center"
            }}>
              <Divider />
              <RichText
                {...props}
                richTextElement={get(props, "data.config.copyright")}
              />
            </Box>
          )}
        </footer>
      </Container>
    </Box>
  );
}

export default Footer;

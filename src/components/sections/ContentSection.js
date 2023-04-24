import React from "react";
import get from "lodash.get";
import { Container, Grid, Typography, useTheme } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { CtaButtons, Image, RichText } from "..";

/*styles
const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(2)
  },
  column: {
    padding: theme.spacing(1)
  },
  actions: {
    "& a": {
      margin: theme.spacing(1)
    }
  }
}));
*/
function ContentSection(props) {
  const section = get(props, "section", null);
  const classes = {};

  const theme = useTheme();
  const imageSizes = `(min-width: ${theme.breakpoints.values.sm}px) 50vw, 100vw`;

  return (

    <section id={get(section, "elements.system.codename", null)} className={classes.section}>
      <Container>
        <Grid container spacing={2} alignItems="stretch" direction="row-reverse">

          {get(section, "elements.image.value[0]", null) && (
            <Grid item xs={12} sm={6} className={classes.column}>
              <Image
                sizes={imageSizes}
                asset={(get(section, "elements.image.value[0]", null))}
                alt={get(section, "elements.image.value[0].description") || get(section, "elements.image.value[0].name")} />
            </Grid>
          )}

          <Grid item xs={12} sm={get(section, "elements.image.value[0]", null) ? 6 : 12} className={classes.column}>
            {get(section, "elements.title", null) && (
              <Typography variant="h2">{get(section, "elements.title.value", null)}</Typography>
            )}

            <Typography variant="subtitle1" className={classes.content}>
              <RichText
                {...props}
                richTextElement={get(section, "elements.content", null)}
              />
            </Typography>

            {get(section, "elements.actions", null) && (
              <div className={classes.actions}>
                <CtaButtons {...props} actions={get(section, "elements.actions.linkedItems", null)} />
              </div>
            )}
          </Grid>

        </Grid>
      </Container>
    </section>
  );
}

export default ContentSection;

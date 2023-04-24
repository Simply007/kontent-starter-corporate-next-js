import { Container, Grid, Typography, useTheme } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import get from "lodash.get";
import React from "react";
import { CtaButtons, Image } from "..";


/*styles
const useStyles = makeStyles((theme) => ({
  section: {
    background: `linear-gradient(to right,${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText
  },
  column: {
    margin: "auto",
    color: theme.palette.primary.contrastText,
    background: "transparent",
  },
  content: {
    marginTop: theme.spacing(2),
  },
  actions: {
    paddingTop: theme.spacing(2),
    color: theme.palette.primary.contrastText
  }
}));
*/
function HeroSection(props) {
  const classes = {};
  const section = get(props, "section", null);

  const theme = useTheme();
  const imageSizes = `(min-width: ${theme.breakpoints.values.sm}px) 40vw, 100vw`;
  return (
    <section id={get(section, "system.codename", null)} className={classes.section}>
      <Container>
        <Grid container spacing={2} alignItems="stretch" direction="row-reverse">

          {get(section, "elements.image.value[0]", null) && (
            <Grid item xs={12} sm={6} className={classes.column}>
              <Image
                sizes={imageSizes}
                asset={get(section, "elements.image.value[0]", null)}
                alt={get(section, "elements.image.value[0].description") || get(section, "elements.image.value[0].name")}
                loading="eager" />
            </Grid>
          )}

          <Grid item xs={12} sm={4} className={classes.column}>
            {get(section, "elements.title", null) && (
              <Typography variant="h2">{get(section, "elements.title.value", null)}</Typography>
            )}

            <Typography variant="subtitle1" className={classes.content}>
              {get(section, "elements.content.value", null)}
            </Typography>

            {get(section, "elements.actions.linkedItems", []).length > 0 && (
              <div className={classes.actions}>
                <CtaButtons {...props} actions={get(section, "elements.actions.linkedItems", null)} />
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </section >
  );
}

export default HeroSection;

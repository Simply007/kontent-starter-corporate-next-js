import React from "react";
import get from "lodash.get";
import { Container, Grid, Typography, useTheme } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { CtaButtons, Image, RichText } from "..";

/*styles
const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(8)
  },
  row: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  image: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  intro: {
    textAlign: "center"
  },
  alignRight: {
    textAlign: "right"
  }
}));
*/
function FeaturesSection(props) {
  const section = get(props, "section", null);
  const classes = {};

  const theme = useTheme();
  const imageSizes = `(min-width: ${theme.breakpoints.values.sm}px) 40vw, 100vw`;

  return (
    <section id={get(section, "elements.system.codename", null)} className={classes.section}>
      <Container>
        <div className={classes.intro}>
          {get(section, "elements.title.value", null) && (
            <Typography variant="h2">{get(section, "elements.title.value", null)}</Typography>
          )}

          {get(section, "elements.subtitle.value", null) && (
            <Typography variant="subtitle1">
              <RichText
                {...props}
                richTextElement={get(section, "elements.subtitle", null)}
              />
            </Typography>)}
        </div>

        {get(section, "elements.features.linkedItems[0]", null) && (
          get(section, "elements.features.linkedItems", []).map((feature, index) => (
            <Grid container spacing={2} alignItems="center" key={index} direction={index % 2 ? "row-reverse" : "row"} className={classes.row}>
              {get(feature, "elements.image.value[0]", null) && (
                <Grid item xs={12} sm={6} className={`${classes.column}, ${classes.image}`}>
                  <Image
                    sizes={imageSizes}
                    asset={(get(feature, "elements.image.value[0]", null))}
                    alt={get(feature, "elements.image.value[0].description") || get(feature, "elements.image.value[0].name")} />
                </Grid>
              )}

              <Grid item xs={12} sm={4} className={`${classes.column} ${index % 2 ? classes.alignRight : undefined}`}>
                <Typography variant="h3">{get(feature, "elements.title.value", null)}</Typography>

                <RichText
                  component="div"
                  {...props}
                  richTextElement={get(feature, "elements.content", null)}
                />

                {
                  get(feature, "elements.actions.linkedItems[0]", null) && (
                    <CtaButtons {...props} actions={get(feature, "elements.actions.linkedItems", null)} />
                  )
                }
              </Grid>
            </Grid>)
          )
        )}
      </Container>
    </section>
  );
}

export default FeaturesSection;

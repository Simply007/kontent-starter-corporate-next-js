import React from "react";
import get from "lodash.get";
import { Container, Grid, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { Action, RichText } from "..";

/*styles
const useStyles = makeStyles((theme) => ({
  section: {
    background: `linear-gradient(to right,${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText
  }
}));
*/
function CtaSection(props) {
  const section = get(props, "section", null);
  const classes = {};


  return (
    <section id={get(section, "system.codename", null)} className={classes.section}>
      <Container>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <div className={classes.intro}>
              {get(section, "elements.title.value", null) && (
                <Typography variant="h2">{get(section, "elements.title.value", null)}</Typography>
              )}
              {get(section, "elements.subtitle.value", null) && (
                <Typography variant="subtitle1" className={classes.content}>
                  <RichText
                    {...props}
                    richTextElement={get(section, "elements.subtitle", null)}
                  />
                </Typography>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Action {...props} action={get(section, "elements.action.linkedItems[0]")} />
          </Grid>
        </Grid>


      </Container>
    </section>
  );
}

export default CtaSection;

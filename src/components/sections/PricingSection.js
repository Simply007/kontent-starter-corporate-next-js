import React from "react";
import get from "lodash.get";
import { Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { CtaButtons, RichText } from "..";

/*styles
const useStyles = makeStyles((theme) => ({
  section: {
  },
  intro: {
    textAlign: "center"
  },
  highlight: {
    borderColor: theme.palette.primary.main,
    borderStyle: "solid",
    borderWidth: "4px"
  },
  priceCard: {
    height: "100%",
    textAlign: "center",
    "& ul": {
      listStyle: "none",
      padding: 0
    },
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column"
  },
  cardActions: {
    justifyContent: "center",
    marginBottom: theme.spacing(1)
  }
}));
*/
function FeaturesSection(props) {
  const section = get(props, "section", null);
  const classes = {};

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

        {get(section, "elements.pricing_plans.linkedItems[0]", null) && (
          <Grid container spacing={2} alignItems="stretch">
            {get(section, "elements.pricing_plans.linkedItems", []).map((plan, plan_idx) => {

              const highlight = plan.elements.options.value.some(option => option.codename === "highlight");
              return (
                <Grid item xs={12} sm={4} className={classes.column} key={plan_idx}>
                  <Card variant='outlined' className={`${classes.priceCard} ${highlight ? classes.highlight : ""}`}>
                    <CardContent>
                      {get(plan, "elements.title.value", null) && (
                        <Typography variant="h3" >{get(plan, "elements.title.value", null)}</Typography>
                      )}
                      {get(plan, "elements.subtitle.value", null) && (
                        <Typography variant="subtitle1" >{get(plan, "elements.subtitle.value", null)}</Typography>
                      )}
                      {get(plan, "elements.price.value", null) && (
                        <Typography variant="h4" >{get(plan, "elements.price.value", null)}</Typography>
                      )}
                      {get(plan, "elements.details.value", null) && (
                        <RichText
                          component="div"
                          {...props}
                          richTextElement={get(plan, "elements.details", null)}
                        />
                      )}
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      {get(plan, "elements.actions.linkedItems[0]", null) && (
                        <div className="plan-footer block-buttons">
                          <CtaButtons {...props} size="large" actions={get(plan, "elements.actions.linkedItems", null)} />
                        </div>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

      </Container>
    </section >
  );
}

export default FeaturesSection;

import React from "react";
import get from "lodash.get";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { RichText } from "..";

/*styles
const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(2)
  },
  intro: {
    textAlign: "center"
  },
  reviewCard: {
    height: "100%"
  }
}));
*/
function ReviewsSection(props) {
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
            <Typography variant="subtitle1" >
              <RichText
                {...props}
                richTextElement={get(section, "elements.subtitle", null)}
              />
            </Typography>
          )}
        </div>


        {get(section, "elements.reviews.linkedItems[0]", null) && (
          <Grid container spacing={2} alignItems="stretch">
            {get(section, "elements.reviews.linkedItems", []).map((review, index) => {
              const author = get(review, "elements.author.linkedItems[0]");
              return (
                <Grid item md={4} sm={12} className={classes.review} key={index}>
                  <Card className={classes.reviewCard} >
                    <CardContent>
                      <Typography component="blockquote">
                        <RichText
                          {...props}
                          richTextElement={get(review, "elements.content", null)}
                        />
                      </Typography>
                      <Typography component="cite">{get(author, "elements.first_name.value")} {get(author, "elements.last_name.value")}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </section>
  );
}

export default ReviewsSection;

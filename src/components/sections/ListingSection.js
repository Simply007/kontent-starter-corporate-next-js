import React from "react";
import get from "lodash.get";
import upperFirst from "lodash.upperfirst";
import camelCase from "lodash.camelcase";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import thumbnails from "../thumbnails";
import { RichText, UnknownComponent } from "..";

/*styles
const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(2)
  },
  intro: {
    textAlign: "center"
  },
  itemCard: {
    height: "100%"
  }
}));
*/
function ListingSection(props) {
  const section = get(props, "section", null);
  const relatedItemsData = get(props, `data.listingSections[${section.system.codename}]`, []);
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
            </Typography>
          )}
        </div>

        {relatedItemsData.items.length > 0 && (
          <Grid container spacing={2} alignItems="stretch">
            {relatedItemsData.items.map((item, item_idx) => {
              const contentType = upperFirst(camelCase(get(item, "system.type", null)));
              const ThumbnailLayout = thumbnails[contentType];

              if (process.env.NODE_ENV === "development" && !ThumbnailLayout) {
                console.error(`Unknown section component for section content type: ${contentType}`);
                return (
                  <Grid item md={4} sm={12} key={item_idx}>
                    <UnknownComponent key={item_idx} {...this.props}>
                      <pre>{JSON.stringify(item, undefined, 2)}</pre>
                    </UnknownComponent>
                  </Grid>

                );
              }

              return (
                <Grid item md={4} sm={12} key={item_idx}>
                  <Card className={classes.itemCard} >
                    <CardContent>
                      <ThumbnailLayout key={item_idx} {...props} item={item} columnCount={3} />
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

export default ListingSection;

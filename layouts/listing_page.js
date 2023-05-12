import get from "lodash.get";
import upperFirst from "lodash.upperfirst";
import camelCase from "lodash.camelcase";
import { Layout, UnknownComponent } from "../src/components";
import { Container, Grid, Paper } from "@mui/material";
import thumbnailLayouts from "../src/components/thumbnails";


function ListingPage(props) {
  const classes = {};
  const page = get(props, "data.page.item", null);
  if (!page) {
    return (
      <UnknownComponent>
        Page {page.system.codename} does not have any content!
      </UnknownComponent>
    );
  }

  const relatedItemsData = get(props, `data.listingItems[${page.system.codename}]`, []);

  return (
    <Layout {...props}>
      <Container sx={{
        paddingTop: (theme) => theme.spacing(4),
        paddingBottom: (theme) => theme.spacing(4)
      }}>
        {relatedItemsData.items.length > 0 &&
          <Grid container spacing={4} alignItems="stretch">
            {relatedItemsData.items.map((item, item_idx) => {
              const contentType = upperFirst(camelCase(get(item, "system.type", null)));

              const ThumbnailLayout = thumbnailLayouts[contentType];
              if (process.env.NODE_ENV === "development" && !ThumbnailLayout) {
                console.error(`Unknown section component for section content type: ${contentType}`);
                return (
                  <Grid item md={4} sm={12} key={item_idx}>
                    <Paper sx={{
                      height: "100%",
                      padding: theme => theme.spacing(2),
                    }}>
                      <UnknownComponent {...props}>
                        <pre>{JSON.stringify(item, undefined, 2)}</pre>
                      </UnknownComponent>
                    </Paper>

                  </Grid>
                );
              }

              return (
                <Grid variant="inbound" item md={4} sm={12} key={item_idx}>
                  <Paper sx={{
                    height: "100%",
                    padding: theme => theme.spacing(2),
                  }}>
                    <ThumbnailLayout  {...props} item={item} site={props} columnCount={3} />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        }
      </Container>
    </Layout>
  );
}

export default ListingPage;
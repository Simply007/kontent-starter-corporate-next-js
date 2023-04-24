import get from "lodash.get";
import { Image, Layout, RichText, UnknownComponent } from "../src/components";
import { Container, Typography, useTheme } from "@mui/material";

// import { makeStyles } from "@mui/styles";

/*styles
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(4)
  }
}));
*/
function SimplePage(props) {
  const classes = {};
  const page = get(props, "data.page.item", null);

  const theme = useTheme();
  const imageSizes = `${theme.breakpoints.values.md}px`;

  if (!page) {
    return (
      <UnknownComponent>
        Page {get(page, "elements.system.codename", null)} does not have any content!
      </UnknownComponent>
    );
  }

  return (
    <Layout {...props}>
      <Container className={classes.root} maxWidth="md">
        {get(page, "elements.title.value", null) && (
          <Typography variant="h1">{get(page, "elements.title.value", null)}</Typography>
        )}
        {get(page, "elements.subtitle.value", null) && (
          <Typography variant="subtitle1" >
            {get(page, "elements.subtitle.value")}
          </Typography>
        )}

        {get(page, "elements.image.value[0]", null) && (
          <div>
            <Image
              sizes={imageSizes}
              asset={(get(page, "elements.image.value[0]", null))}
              alt={get(page, "elements.image.value[0].description") || get(page, "elements.image.value[0].name", null)} />
          </div>
        )}
        <Typography component="div">
          <RichText
            {...props}
            richTextElement={get(page, "elements.content", null)}
          />
        </Typography>
      </Container>
    </Layout>
  );
}

export default SimplePage;
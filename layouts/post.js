import get from "lodash.get";
import { Image, Layout, RichText, UnknownComponent } from "../src/components";
import { Container, Typography, useTheme } from "@mui/material";

function Post(props) {
  const classes = {};
  const post = get(props, "data.page.item", null);

  if (!post) {
    return (
      <UnknownComponent>
        Page {post.system.codename} does not have any content!
      </UnknownComponent>
    );
  }

  const theme = useTheme();
  const imageSizes = `${theme.breakpoints.values.md}px`;

  return (
    <Layout {...props}>
      <Container sx={{
        paddingTop: theme => theme.spacing(4)
      }} maxWidth="md">
        {get(post, "elements.title.value", null) && (
          <Typography variant="h1">{get(post, "elements.title.value", null)}</Typography>
        )}
        {get(post, "elements.subtitle.value", null) && (
          <Typography variant="subtitle1" >
            <RichText
              {...props}
              richTextElement={get(post, "elements.subtitle", null)}
            />
          </Typography>
        )}

        {get(post, "elements.image.value[0]", null) && (
          <div>
            <Image
              sizes={imageSizes}
              asset={get(post, "elements.image.value[0]", null)}
              alt={get(post, "elements.image.value[0].description") || get(post, "elements.image.value[0].name", null)} />
          </div>
        )}
        <Typography component="div">
          <RichText
            {...props}
            richTextElement={get(post, "elements.content", null)}
          />
        </Typography>

        <footer>
          <time>{get(post, "elements.publishing_date.value", null) && new Date(get(post, "elements.publishing_date.value", null)).toDateString()}</time>
          {get(post, "elements.author.value[0]", null) &&
            (", by " + get(post, "elements.author.value[0].first_name.value", null) + " " + get(post, "elements.author.value[0].last_name.value", null))}
        </footer>
      </Container>
    </Layout>
  );
}

export default Post;
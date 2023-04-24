import React from "react";
import get from "lodash.get";
import { Image, Link } from "..";
import { useTheme } from "@mui/material";

function Post(props) {
  let post = get(props, "item", null);
  let columnCount = get(props, "columnCount", 1);
  let postUrl = "/blog/" + get(post, "elements.slug.value", "#");

  const theme = useTheme();
  const imageSizes = `(min-width: ${theme.breakpoints.values.md}px) ${Math.floor(100 / columnCount)}vw, 100vw`;

  return (
    <article>
      <div>
        {get(post, "elements.image.value[0]", null) && (
          <Link href={postUrl}>
            <Image
              sizes={imageSizes}
              asset={(get(post, "elements.image.value[0]", null))}
              alt={get(post, "elements.image.value[0].description") || get(post, "elements.image.value[0].name", null)} />
          </Link>
        )}
        <div>
          <header>
            <h3><Link href={postUrl}>{get(post, "elements.title.value", null)}</Link></h3>
          </header>
          <div>
            <p>{get(post, "elements.excerpt.value", null)}</p>
          </div>
          <footer>
            <time>{get(post, "elements.publishing_date.value", null) && new Date(get(post, "elements.publishing_date.value", null)).toDateString()}</time>
            {get(post, "elements.author.value[0]", null) &&
              (", by " + get(post, "elements.author.linkedItems[0].elements.first_name.value", null) + " " + get(post, "elements.author.linkedItems[0].elements.last_name.value", null))}
          </footer>
        </div>
      </div>
    </article>
  );
}

export default Post;

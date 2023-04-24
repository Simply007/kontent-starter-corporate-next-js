import { Typography, useTheme } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import get from "lodash.get";
import { Image, Link } from ".";
import { getUrlFromMapping } from "../utils";
import { PortableText } from "@portabletext/react";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver/dist/cjs/src/transformers/portable-text-transformer/portable-text-transformer";
import { nodeParse } from "@kontent-ai/rich-text-resolver/dist/cjs/src/parser/node";


/*styles
const useStyles = makeStyles((theme) => ({
  richText: {
    "& table": {
      borderCollapse: "collapse",
      "& td,th": {
        border: "1px solid",
        borderColor: theme.palette.grey[500],
        textAlign: "center",
        padding: theme.spacing(1),
      },
      "& tr:nth-child(even)": {
        backgroundColor: theme.palette.grey[100],
      }
    }
  },
  quote: {
    fontStyle: "italic",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    display: "inline-block"
  },
  code: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    minWidth: "50vw",
    display: "inline-block"
  },
  inlineImage: {
    width: "theme.breakpoints.values.sm"
  },
}));
*/
function RichText(props) {
  const richTextElement = get(props, "richTextElement", "");
  const linkedItems = get(props, "data.page.linkedItems", []);
  const mappings = get(props, "mappings");

  const classes = {};
  const theme = useTheme();

  const portableTextComponents = {
    types: {
      image: ({ value }) => {
        const image = richTextElement.assets.find(image => image.image_id === value.asset._ref);
        return (
          <div className={classes.inlineImage}>
            <Image
              sizes={`${theme.breakpoints.values.sm}px`}
              asset={image}
              width={theme.breakpoints.values.sm}
              alt={image.description || image.name} />
          </div>
        );
      },
      component: (block) => {
        const linkedItem = linkedItems.find(
          (item) => item.system.codename === block.value.component._ref
        );
        const contentItemType = linkedItem ? linkedItem.system.type : "";

        switch (contentItemType) {
          case "quote":
            return (
              <blockquote className={classes.quote}>
                &ldquo;{linkedItem.elements.quote_text.value}&rdquo;
              </blockquote>
            );
          case "code_block":
            return (
              <Typography component="div" className={classes.code}>
                <RichText
                  {...props}
                  richTextElement={get(linkedItem, "elements.code", null)}
                />
              </Typography>
            );
          default:
            return <div>Content item not supported</div>;
        }
      },
      table: ({ value }) => {
        const table = (
          <table>
            {
              value.rows.map(row => (
                <tr key={row.key}>
                  {row.cells.map(cell => {
                    return (
                      <td key={cell.key}>
                        <PortableText
                          value={cell.content}
                          components={portableTextComponents}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))
            }
          </table>
        );
        return table;
      }
    },
    marks: {
      link: ({ value, children }) => {
        const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
        return (
          <a href={value?.href} target={target} rel={value?.rel} title={value?.title} data-new-window={value["data-new-window"]}>
            {children}
          </a>
        );
      },
      internalLink: ({ value, children }) => {
        const link = richTextElement.links.find(
          (link) => link.linkId === value.reference._ref
        );

        const url = getUrlFromMapping(mappings, link.codename);
        if (url) {
          return (
            <Link href={url}>
              {children}
            </Link>
          );
        }
        else {
          return (
            <del>{children}</del>
          );
        }
      },
    },
  };

  const parsedTree = nodeParse(richTextElement.value);
  const portableText = transformToPortableText(parsedTree);

  return (
    <div className={classes.richText}>
      <PortableText value={portableText} components={portableTextComponents} />
    </div>
  );
}

export default RichText;

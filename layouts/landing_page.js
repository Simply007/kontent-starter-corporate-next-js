import get from "lodash.get";
import upperFirst from "lodash.upperfirst";
import camelCase from "lodash.camelcase";
import { Layout, UnknownComponent } from "../src/components";
import sections from "../src/components/sections";
import { Box } from "@mui/material";


function LandingPage(props) {
  const page = get(props, "data.page.item", null);

  if (!page) {
    return (
      <UnknownComponent>
        Page {page.system.codename} does not have any content!
      </UnknownComponent>
    );
  }

  return (
    <Layout {...props}>
      <Box sx={{
        "& > section:first-child": {
          paddingTop: (theme) => theme.spacing(10),
          paddingBottom: (theme) => theme.spacing(10)
        }
      }}>
        {get(page, "elements.sections.linkedItems", []).map((section, index) => {
          const contentType = upperFirst(camelCase(get(section, "system.type", null)));
          const Component = sections[contentType];

          if (process.env.NODE_ENV === "development" && !Component) {
            console.error(`Unknown section component for section content type: ${contentType}`);
            return (
              <UnknownComponent key={index} {...props}>
                <pre>{JSON.stringify(section, undefined, 2)}</pre>
              </UnknownComponent>
            );
          }

          return (
            <Component key={index} {...props} section={section} site={props} />
          );
        })
        }
      </Box>
    </Layout>
  );
}

export default LandingPage;
import get from "lodash.get";
import upperFirst from "lodash.upperFirst";
import camelCase from "lodash.camelCase";
import { Layout, UnknownComponent } from "../components"
import sections from '../components/sections';
import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sections: {
    '& > section:first-child': {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8)
    }
  }
}));

function LandingPage(props) {
  const classes = useStyles();
  return (
    <Layout {...props}>
      <Box className={classes.sections}>
        {get(props, 'page.content.value[0].sections.value', []).map((section, index) => {
          const contentType = upperFirst(camelCase(get(section, 'system.type', null)));
          const Component = sections[contentType];

          if (process.env.NODE_ENV === 'development' && !Component) {
            console.error(`Unknown section component for section content type: ${contentType}`)
            return (
              <UnknownComponent key={index} {...props}>
                <pre>{JSON.stringify(section, undefined, 2)}</pre>
              </UnknownComponent>
            );
          }

          return (
            <Component key={index} {...props} section={section} site={props} />
          )
        })
        }
      </Box>
    </Layout>
  );
}

export default LandingPage;
import { Box } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { Footer, Header, PreviewBar } from ".";


/*styles
const useStyles = makeStyles((_theme) => ({
  root: {
    minHeight: "100vh"
  },
  flex: {
    flexGrow: 1
  }
}));
*/
function Layout(props) {
  const classes = {};

  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" alignContent="space-between" className={classes.root}>
      {props.preview && (
        <PreviewBar {...props} />
      )}
      <Header {...props} />
      <main className={classes.flex}>
        {props.children}
      </main>
      <Footer {...props} />
    </Box>
  );
}

export default Layout;
import { Box } from "@mui/material";
import { Footer, Header, PreviewBar } from ".";

function Layout(props) {
  const classes = {};

  return (
    <Box display="flex" flexDirection="column" alignItems="stretch" alignContent="space-between"
      sx={{
        minHeight: "100vh"

      }}>
      {props.preview && (
        <PreviewBar {...props} />
      )}
      <Header {...props} />
      <main style={{
        flexGrow: 1
      }}>
        {props.children}
      </main>
      <Footer {...props} />
    </Box>
  );
}

export default Layout;
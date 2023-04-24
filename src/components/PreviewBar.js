import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import { makeStyles } from "@mui/styles";
import { Button, Container } from "@mui/material";

/*styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    zIndex: theme.zIndex.appBar + 1,
    bottom: 0,
  },
  actions: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: theme.spacing(4),
  },
  exitButton: {
    margin: theme.spacing(1),
    borderColor: theme.palette.primary.contrastText,
    color: theme.palette.primary.contrastText
  }
}));
*/
function Header(props) {
  const classes = {};

  return (
    <div className={classes.root}>
      <AppBar color="secondary" position="sticky">
        <Container>
          <Toolbar>
            {props.preview && (
              <p>
                You can see preview version of the site!
              </p>
            )}
            <div className={classes.actions}>
              <Button className={classes.exitButton} variant="outlined" href="/api/exit-preview">Exit preview</Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div >
  );
}

export default Header;

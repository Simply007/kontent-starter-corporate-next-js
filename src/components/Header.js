import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import { makeStyles } from "@mui/styles";
import get from "lodash.get";
import { Action, Image, Link, SideDrawer } from ".";
import { Container, Hidden } from "@mui/material";


/*styles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: "200px",
  },
  mainMenu: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
    "& a": {
      margin: theme.spacing(1),
    }
  }
}));
*/
function Header(props) {
  const classes = {};

  return (
    <div className={classes.root}>
      <AppBar color="transparent" position="sticky">
        <Container>
          <Toolbar>
            <Link href='/' className={classes.logo}>
              {get(props, "data.config.item.elements.header_logo.value[0]")
                ? (<Image
                  asset={get(props, "data.config.item.elements.header_logo.value[0]")}
                  alt={get(props, "data.config.item.elements.title.value", null)}
                  width="200"
                  height="60"
                />)
                : (<Typography variant="h6">{get(props, "data.config.item.elements.title.value", null)}</Typography>)
              }
            </Link>
            <Hidden mdDown>
              <div className={classes.mainMenu}>
                {get(props, "data.config.item.elements.main_menu.linkedItems[0].elements.actions.linkedItems", []).map((navigationItem, index) => (
                  <Action key={index} action={navigationItem} {...props} />
                ))}
              </div>
            </Hidden>
            <Hidden mdUp>
              <div className={classes.mainMenu}>
                <SideDrawer navLinks={get(props, "data.config.item.elements.main_menu.linkedItems[0].elements.actions.linkedItems", [])} {...props} />
              </div>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
    </div >
  );
}

export default Header;

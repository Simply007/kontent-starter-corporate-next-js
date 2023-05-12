import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import get from "lodash.get";
import { Action, Image, Link, SideDrawer } from ".";
import { Container, Hidden } from "@mui/material";

const styles = {
  mainMenu: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end"
  }
};

function Header(props) {
  return (
    <div style={{
      flexGrow: 1,
    }}>
      <AppBar color="transparent" position="sticky">
        <Container>
          <Toolbar>
            <Link href='/' style={{
              width: "200px",
              display: "inline-block"
            }}>
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
              <div style={styles.mainMenu}>
                {get(props, "data.config.item.elements.main_menu.linkedItems[0].elements.actions.linkedItems", []).map((navigationItem, index) => (
                  <Action key={index} action={navigationItem} {...props} sx={{ margin: theme => theme.spacing(1) }} />
                ))}
              </div>
            </Hidden>
            <Hidden mdUp>
              <div style={styles.mainMenu}>
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

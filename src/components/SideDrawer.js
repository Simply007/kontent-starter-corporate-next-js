import { Drawer, IconButton, List, ListItem } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { Action, Icon } from ".";

/* styles
const useStyles = makeStyles({
  list: {
    width: 250
  },
  linkText: {
    textDecoration: "none",
    textTransform: "uppercase",
    color: "black"
  }
});
*/

const SideDrawer = (props) => {
  const classes = {};
  const [state, setState] = useState({ right: false });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
  };

  const sideDrawerList = anchor => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav">
        {props.navLinks.map((navigationItem, index) => (
          <ListItem key={index} >
            <Action action={navigationItem} {...props} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return <>
    <IconButton
      edge="start"
      aria-label="menu"
      onClick={toggleDrawer("right", true)}
      size="large">
      <Icon iconCodename="menu" />
    </IconButton>
    <Drawer
      anchor="right"
      open={state.right}
      onOpen={toggleDrawer("right", true)}
      onClose={toggleDrawer("right", false)}
    >
      {sideDrawerList("right")}
    </Drawer>
  </>;
};

export default SideDrawer;
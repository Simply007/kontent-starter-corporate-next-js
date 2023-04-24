import { getUrlFromMapping } from "../utils";
import get from "lodash.get";
import { Button } from "@mui/material";
import { Link, Icon } from ".";

function Action(props) {
  const { action, mappings } = props;
  const navigationItem = get(action, "elements.navigation_item.linkedItems[0]", null);
  const href = navigationItem.system.type === "external_url"
    ? get(navigationItem, "elements.url.value")
    : getUrlFromMapping(mappings, navigationItem.system.codename);
  const action_options = get(action, "elements.options.value", []);

  const role = get(action, "elements.role.value[0].codename", null);
  const outlined = action_options.some(item => item.codename === "outlined");
  const config = {};
  if (role) {
    config.variant = "contained";
    config.color = role;
  }
  if (outlined) {
    config.variant = "outlined";
  }

  const new_window = action_options.some(item => item.codename === "new_window");
  const no_follow = action_options.some(item => item.codename === "no_follow");
  const icon = get(action, "elements.icon.linkedItems[0]", null);
  const iconPosition = get(icon, "elements.icon_position.value[0].codename", null);
  const options = {
    target: new_window ? "_blank" : undefined,
    rel: new_window || no_follow
      ? `${new_window ? "noopener" : ""} ${no_follow ? "nofollow" : ""}`
      : undefined,
  };

  return (
    <Button
      component={Link}
      startIcon={iconPosition && iconPosition === "left" && <Icon icon={icon} />}
      endIcon={iconPosition && iconPosition === "right" && <Icon icon={icon} />}
      underline="none"
      size={props.size}
      href={href}
      {...config}
      {...options}>
      {action.elements.label.value}
    </Button>
  );
}

export default Action;

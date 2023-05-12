import React from "react";
import get from "lodash.get";
import { Action } from "..";

function Menu(props) {
  const section = get(props, "section", null);
  const classes = {};


  return (
    <section id={get(section, "system.codename", null)} className={classes.section}>
      {get(section, "elements.label", null) && (
        <h2>{get(section, "elements.label.value", null)}</h2>
      )}

      {get(section, "elements.actions.linkedItems[0]", null) && (
        <ul style={{
          listStyle: "none",
          padding: 0
        }}>
          {get(section, "elements.actions.linkedItems", []).map((action, action_idx) => {
            return (
              <li key={action_idx}>
                <Action {...props} action={action} size="small" />
              </li>
            );
          })}
        </ul>
      )}

    </section>
  );
}

export default Menu;

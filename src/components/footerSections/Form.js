import React from "react";
import get from "lodash.get";
import { Button } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { FormField } from "..";

/* styles
const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  }
}));
*/
function Form(props) {
  const form = get(props, "section", null);
  const classes = {};


  return (
    <section id={get(form, "system.codename", null)}>
      {get(form, "elements.title", null) && (
        <h2>{get(form, "elements.title.value", null)}</h2>
      )}

      {get(form, "elements.content.value", null) && (
        <div>{get(form, "elements.content.value", null)}</div>
      )}

      {/* TODO #15 */}
      { form && (
        <form
          name={get(form, "elements.form_id.value", null)}
          id={get(form, "elements.form_id.value", null)}
          action={get(form, "elements.form_action.value", null)}
          method="POST"
          className={classes.form}>

          {get(form, "elements.fields.linkedItems", []).map((field, field_idx) => (
            <FormField field={field} key={field_idx} />
          ))
          }

          <Button variant="contained" color="primary">
            {get(form, "elements.submit_label.value", null)}
          </Button>
        </form>
      )}

    </section>
  );
}

export default Form;

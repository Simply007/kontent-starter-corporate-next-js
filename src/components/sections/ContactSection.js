import React from "react";
import get from "lodash.get";
import { Button, Container, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { FormField, RichText } from "..";

/*styles
const useStyles = makeStyles((theme) => ({
  formSubmission: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1)
  }
}));
*/
function ContactSection(props) {
  const section = get(props, "section", null);
  const form = get(section, "elements.form.linkedItems[0]", null);
  const classes = {};


  return (
    <section id={get(section, "elements.system.codename", null)} className={classes.section}>
      <Container>
        <div className={classes.intro}>
          {get(section, "elements.title.value", null) && (
            <Typography variant="h2">{get(section, "elements.title.value", null)}</Typography>
          )}
          {get(section, "elements.subtitle.value", null) && (
            <Typography variant="subtitle1" >
              <RichText
                {...props}
                richTextElement={get(section, "elements.subtitle", null)}
              />
            </Typography>
          )}
        </div>

        <Typography component="div">
          <RichText
            {...props}
            richTextElement={get(section, "elements.content", null)}
          />
        </Typography>

        {form && (
          <form
            name={get(form, "elements.form_id.value", null)}
            id={get(form, "elements.form_id.value", null)}
            action={get(form, "elements.form_id.form_action.value", null)}
            method="POST"

          >

            {get(form, "elements.fields.linkedItems", []).map((field, field_idx) => (
              <FormField field={field} key={field_idx} />
            ))
            }

            <Button variant="contained" color="primary" className={classes.formSubmission}>
              {get(form, "elements.submit_label.value", null)}
            </Button>
          </form>
        )}

      </Container>
    </section>
  );
}

export default ContactSection;
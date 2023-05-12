import React from "react";
import get from "lodash.get";
import { Typography } from "@mui/material";
import { CtaButtons, Image, RichText } from "..";

function ContentSection(props) {
  const section = get(props, "section", null);

  return (
    <section id={get(section, "system.codename", null)} >
      {get(section, "elements.title", null) && (
        <Typography variant="h2">{get(section, "elements.title.value", null)}</Typography>
      )}

      {get(section, "elements.image.value[0]", null) && (
        <div>
          <Image
            width="160"
            height="80"
            asset={(get(section, "elements.image.value[0]", null))}
            alt={get(section, "elements.image.value[0].description") || get(section, "elements.image.value[0].name", null)}
            sizes="160px" />
        </div>
      )}

      {get(section, "elements.content.value", null) && (
        <Typography component="div" sx={{ textAlign: 'center' }} >
          <RichText
            {...props}
            richTextElement={get(section, "elements.content", null)}
          />
        </Typography>
      )}

      {get(section, "elements.actions.linkedItems", null) && (
        <div>
          <CtaButtons {...props} actions={get(section, "elements.actions.linkedItems", null)} />
        </div>
      )}
    </section>
  );
}

export default ContentSection;

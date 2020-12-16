import React from "react";

export default ({data}) => (
  <>
    {data.uid.attributes.display_name && <section className="block block-field-blocknodelanding-pageuid clearfix">
      <span className="field field--name-uid field--type-entity-reference">
        {data.uid.links.self.href ? <a href={data.uid.links.self.href}>{data.uid.attributes.display_name}</a> : <span>{data.uid.attributes.display_name}</span>}
      </span>
    </section>}
  </>
)

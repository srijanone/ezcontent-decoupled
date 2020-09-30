import React from "react";

export default ({data}) => (
  <>
    {data.created && <section className="block block-field-blocknodelanding-pagecreated clearfix">
      <span className="field field--name-created field--type-created">{data.created}</span>
    </section>}
  </>
)

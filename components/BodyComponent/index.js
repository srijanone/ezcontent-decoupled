import React from 'react';
export default ({data}) => (
  <>
    {data.body.value && <section className="block block-field-blocknodelanding-pagebody clearfix">
      <div className="field field--name-body field--type-text-with-summary">
        {data.configuration.label_display ? <div className="field__label">{data.configuration.label}</div> : null}
        <div className="field__item" dangerouslySetInnerHTML={{ __html: data.body.value }}></div>
      </div>
    </section>}
  </>
);

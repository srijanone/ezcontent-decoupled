import React from 'react';
import BlockTitle from '../BlockTitle';
export default ({data}) => (
  <>
    {data.title && <section className="block block-field-blocknodelanding-pagetitle clearfix">
      <h1 className="field--name-title field--type-string">{data.title}</h1>
    </section>} 
  </>
);
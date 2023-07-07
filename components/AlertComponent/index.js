import React from "react";
import get from 'lodash/get';

export default ({data}) =>  {
  let backgroundColor = data.attributes.field_background_color ? data.attributes.field_background_color.color : null,
  opacity = data.attributes.field_background_color ? data.attributes.field_background_color.opacity : null;
  let blockHead =  get(data, 'block_layout_settings.label');
  let blockHeadVisbility =  get(data, 'block_layout_settings.label_display');
  return (
    <>
      {(blockHead && blockHeadVisbility === 'visible') ? <h1 className="block_title p-t-b-10">{blockHead}</h1>:null}
      {data.attributes.body.value && <><section className="block block--type-alert-banner clearfix">
        <div className="clearfix field field--name-body field--type-text-with-summary" dangerouslySetInnerHTML={{ __html: data.attributes.body.value }} style={{backgroundColor: backgroundColor, opacity: opacity}}>
        </div>
      </section><p></p></>}
    </>
  )
};

import React from "react";
import BlockTitle from "../BlockTitle";
export default props => {
  const {
    field_map: location,
    field_title: title,
    field_body: body,
    field_link: link,
    field_short_title: subTitle
  } = props.data.attributes;
  const url = `https://maps.google.com/maps?hl=en&q=${location}&t=m&z=14&output=embed`;
  
  return (
    <>
      <BlockTitle blockTitle={props.data} landingPageCheck={props.landingPageCheck}/>
      <div className="mt-3 mb-3 paragraph--type--map">
        {title && <div className="field--name-field-title">{title}</div>}
        {subTitle && <div className="field--name-field-short-title">{subTitle}</div>}
        <>
          <iframe className="w-100" src={url} frameBorder="0" height="410px">
            Map
          </iframe>
        </>
        {body && <div dangerouslySetInnerHTML={{ __html: body.processed }} />}
        {link && (
          <div className="w-100 text-right">
            <a className="nounderline btn btn-primary rounded-0 white-color" href={link.url}>
              {(link.title) ? link.title : link.url}
            </a>
          </div>
        )}
      </div>
    </>
  );
};

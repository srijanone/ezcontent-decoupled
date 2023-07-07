import React from "react";
import BlockTitle from "../BlockTitle";
import handleImageInProcessedText from "../../common/helper";
export default props => {
  const { componentAttributes } = props.data;
  const {
    field_map: location,
    field_title: title,
    field_body: body,
    field_link: link,
    field_short_title: subTitle
  } = props.data.attributes;
  const url = `https://maps.google.com/maps?hl=en&q=${location}&t=m&z=14&output=embed`;
  let dynamicAttributes = componentAttributes?.block_content_attributes?.data.split("\n").reduce(function(obj, str, index) {
    let strParts = str.split("|");
    if (strParts[0] && strParts[1]) {
      obj[strParts[0]] = strParts[1].replace("\r", '');
      return obj;
    }
  }, {});

  //Dynamic style attributes
  let dynamicStyle = componentAttributes?.block_content_attributes?.style.split(" ").reduce(function(obj, str, index) {
    let strParts = str.split(":");
    if (strParts[0] && strParts[1]) {
      obj[strParts[0]] = strParts[1].replace(";", '');;
      return obj;
  }
  }, {});

  return (
    <>
      <BlockTitle blockTitle={props.data} landingPageCheck={props.landingPageCheck} />
      <div className={`mt-3 mb-3 paragraph--type--map ${componentAttributes?.block_content_attributes?.class ? componentAttributes?.block_content_attributes.class : ""}`}
        id={componentAttributes?.block_content_attributes?.id ? componentAttributes?.block_content_attributes.id : null} {...dynamicAttributes} style={{...dynamicStyle}}>
        {title && <div className="field--name-field-title">{title}</div>}
        {subTitle && <div className="field--name-field-short-title">{subTitle}</div>}
        <>
          <iframe className="w-100" src={url} frameBorder="0" height="410px">
            Map
          </iframe>
        </>
        {body && <div dangerouslySetInnerHTML={{ __html: handleImageInProcessedText(body.processed, props.baseUrl) }} />}
        {link && (
          <div className="w-100 text-right">
            <a className="nounderline btn btn-primary rounded-0 white-color" href={link.uri}>
              {(link.title) ? link.title : link.uri}
            </a>
          </div>
        )}
      </div>
    </>
  );
};

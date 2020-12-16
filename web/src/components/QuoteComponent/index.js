import React from "react";
import BlockTitle from "../BlockTitle";

export default props => {
  
  const {
    field_author: author,
    field_job_title: jobTitle,
    field_quote: quote,
    field_source: source,
  } = props.data.attributes;

  return (
    <>
      <BlockTitle blockTitle={props.data} landingPageCheck={props.landingPageCheck}/>
      <div className="mb-3 mt-3 paragraph--type--quote">
        { quote ?  <div className="field--name-field-quote">{quote}</div> : null }
        { author ? <div>{author}</div> : null}
        { jobTitle ? <div>{jobTitle}</div> : null }
        { source ? <><div className="field__label">Source</div><div className="field__item">{source}</div></> : null }
      </div>
    </>
  );
};

import React from "react";
import get from "lodash/get";
import BlockTitle from "../BlockTitle";

export default props => {
  const question = get(props, "data.attributes.field_question");
  const answer = get(props, "data.attributes.field_answer.processed");
  return (
    <>
    <BlockTitle blockTitle={props.data} landingPageCheck={props.landingPageCheck}/>
    <div>
      <div>
        <h4>{question}</h4>
      </div>
      <div dangerouslySetInnerHTML={{ __html: answer }} />
    </div>
    </>
  );
};

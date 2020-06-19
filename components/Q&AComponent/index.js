import React from "react";
import get from "lodash/get";
import BlockTitle from "../BlockTitle";
import handleImageInProcessedText from "../../common/helper";

export default props => {
  const question = get(props, "data.attributes.field_question");
  const answer = handleImageInProcessedText(get(props, "data.attributes.field_answer.processed"),props.baseUrl);
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

import React from "react";
import get from "lodash/get";

export default (props) => {
  const errorCode = get(props.error, "status");
  const errorMessage = get(props.error, "statusText");
  const style = {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '80px 0'
  }
  return (
    <div style={style}>
      <h1>{errorCode}</h1>
      <h3>{errorMessage}</h3>
    </div>
  );
};

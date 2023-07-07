import React from 'react';
import get from "lodash/get";

export default ({ blockTitle, landingPageCheck }) => {
  if (landingPageCheck && blockTitle) {
    let blockdata = get(blockTitle, "block_layout_settings.label_display");
    let blockdataTitle = get(blockTitle, "block_layout_settings.label") ? get(blockTitle, "block_layout_settings.label") : '';
    let blockClass = get(blockTitle, "componentAttributes.block_title_attributes.class") ? get(blockTitle, "componentAttributes.block_title_attributes.class") : "";
    let blockId = get(blockTitle, "componentAttributes.block_title_attributes.id") ? get(blockTitle, "componentAttributes.block_title_attributes.id") : null;
    let blockDataAttribute = get(blockTitle, "componentAttributes.block_title_attributes.data") ? get(blockTitle, "componentAttributes.block_title_attributes.data") : null;
    let blockDataStyle = get(blockTitle, "componentAttributes.block_title_attributes.style") ? get(blockTitle, "componentAttributes.block_title_attributes.style") : null;
    //dynamci data attribute
    let dynamicAttributes = blockDataAttribute.split("\n").reduce(function(obj, str, index) {
      let strParts = str.split("|");
      if (strParts[0] && strParts[1]) {
        obj[strParts[0]] = strParts[1].replace("\r", '');
        return obj;
      }
    }, {});
    //Dynamic style attributes
    let dynamicStyle = blockDataStyle.split(" ").reduce(function(obj, str, index) {
      let strParts = str.split(":");
      if (strParts[0] && strParts[1]) {
        obj[strParts[0]] = strParts[1].replace(";", '');;
        return obj;
    }
    }, {});
console.log("Dynamic blockDataStyle" , blockDataStyle)
    if (blockdata) {
      return (
        <h1 className={`block_title p-t-b-10 ${blockClass}`} id={blockId} {...dynamicAttributes} style={{...dynamicStyle}} > {blockdataTitle}</h1>
      )
    }
  }
  return null;
};

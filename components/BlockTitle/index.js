import React from 'react';
import get from "lodash/get";

export default ({ blockTitle, landingPageCheck }) => {
  if(landingPageCheck && blockTitle){
    let blockdata = get(blockTitle, "block_layout_settings.label_display");
    let blockdataTitle = get(blockTitle, "block_layout_settings.label") ? get(blockTitle, "block_layout_settings.label") : '';
    if(blockdata){
      return (
        <h1 className='block_title p-t-b-10'>{blockdataTitle}</h1>
      )
    }
  }
  return null;
};

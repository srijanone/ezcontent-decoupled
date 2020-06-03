import React from 'react';
// import Head from 'next/head';
import {Helmet} from "react-helmet";
import isArray from 'lodash/isArray';
import get from "lodash/get";

export default ({ meta }) => {
  let metaHolder;
  if(meta){
    let metaData = get(meta,"metatag_normalized").filter(({ tag }) => tag === "meta");
    if (metaData){
      metaHolder = metaData.map((mTag,i)=>{
        return <meta key={`meta__${i}`} name={get(mTag,"attributes.name")} content={isArray(get(mTag,"attributes.content")) ? get(mTag,"attributes.content").toString() : typeof(get(mTag,"attributes.content")) === 'string' ? get(mTag,"attributes.content") : ''} />
      });
    }
  }
  const titleStr = (get(meta,"title") ? get(meta,"title") : 'EZContent');
  return (
    <Helmet>
      <title>{titleStr}</title>
      {metaHolder ? metaHolder : null}
    </Helmet>
  )
};

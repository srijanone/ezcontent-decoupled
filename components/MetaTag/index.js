import React from 'react';
// import Head from 'next/head';
import {Helmet} from "react-helmet";
import isArray from 'lodash/isArray';
import get from "lodash/get";

export default ({ meta }) => {
  let metaHolder;
  let structuredJSON = null;
  let innerSchemaMeta = [];
  let outerSchemaMeta = [];
  outerSchemaMeta["@context"] = "https://schema.org";
  
  if(meta){
    let metaData = get(meta,"metatag_normalized")?.filter(({ tag }) => tag === "meta");
    if (metaData){
      metaHolder = metaData.map((mTag,i)=>{
        if(get(mTag,"attributes.name")){
          return <meta key={`meta__${i}`} name={get(mTag,"attributes.name")} content={isArray(get(mTag,"attributes.content")) ? get(mTag,"attributes.content").toString() : typeof(get(mTag,"attributes.content")) === 'string' ? get(mTag,"attributes.content") : ''} />
        }
        if(get(mTag,"attributes.property")){
          return <meta key={`meta__${i}`} property={get(mTag,"attributes.property")} content={isArray(get(mTag,"attributes.content")) ? get(mTag,"attributes.content").toString() : typeof(get(mTag,"attributes.content")) === 'string' ? get(mTag,"attributes.content") : ''} />
        }        
      });
      // generate application/ld+json
      let schemaMeta = metaData.filter(({ attributes }) => attributes.schema_metatag === true);
      if (schemaMeta){
        schemaMeta.map((smTag)=>{
          if(get(smTag,"attributes.name")){
            innerSchemaMeta[get(smTag,"attributes.name")] = get(smTag,"attributes.content");
          }
        });
        if(innerSchemaMeta){
          outerSchemaMeta["@graph"] = [Object.assign({}, innerSchemaMeta)];
        }
      }
      structuredJSON = JSON.stringify(Object.assign({}, outerSchemaMeta))
    }
  }
  const titleStr = (get(meta,"title") ? get(meta,"title") : 'EZContent');
  return (
    <Helmet>
      <title>{titleStr}</title>
      {metaHolder ? metaHolder : null}
      {structuredJSON ? <script className='structured-data-list' type="application/ld+json">{structuredJSON}</script> : null}
    </Helmet>
  )
};

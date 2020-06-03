import React from "react";
import get from "lodash/get";
import EZContentJsonApi from 'ezcontent_jsonapi';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Component from "../components";
import ErrorComp from "./_error";

function MyApp({ fetchPage, headerFooter, error }) {

  return error === false ? (
    <>
      <Header data={headerFooter.main} />
      <Component data={fetchPage} baseUrl={process.env.API_HOST} />
      <Footer data={headerFooter}/>
    </>
  ) : (
    <ErrorComp error={fetchPage} />
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;

  let payloadObj = {};
  let pathData = ctx.asPath.split("?");
  
  payloadObj["pathAlias"] = pathData[0]; // get the path
  payloadObj["query"] = ctx.query; // get query

  const fetchPage = await postRequest(
    process.env.API_HOST,
    payloadObj
  );
  
  let headerFooter = {};
  let error = false;
  if(fetchPage.content) {
    headerFooter = get(fetchPage, "menus");
  } else {
    error = true;
  }
  return { fetchPage, headerFooter, error };
};


async function postRequest(url, payload) {
  const res = EZContentJsonApi({
    baseURL: url,
    request: payload,
    oauth: {
        username: process.env.AUTH_USERNAME,
        password: process.env.AUTH_PASSWORD,
        clientSecret: process.env.CLIENT_SECRET,
        clientId: process.env.CLIENT_ID
    },
    includedFields: [
      {
        type: 'article',
        jsonQuery: 'include=field_author.field_thumbnail.field_media_image,field_tags,field_thumbnail.thumbnail&fields[media--image]=name,metatag,thumbnail&fields[file--file]=uri,filename&fields[node--author]=body,title,status,path,field_thumbnail&fields[taxonomy_term--tags]=name,path'
      }
    ]
  });
  
  return await res.then((json) => {
    return json
  })
  .catch(err => {
    return err;
  });
  
}

export default MyApp;

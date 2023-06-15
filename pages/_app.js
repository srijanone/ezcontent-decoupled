import React from 'react';
import get from 'lodash/get';
import EZContentJsonApi from 'ezcontent_jsonapi';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Component from '../components';
import ErrorComp from './_error';
import { getOauth, getMenus, resolveUrl, PageContent } from 'ezcontent_jsonapi';

function MyApp({ fetchPage, headerFooter, error }) {
  return error === false ? (
    <>
      <Header data={headerFooter} />
      <Component
        data={fetchPage}
        baseUrl={process.env.API_HOST}
        instagram_token_val={process.env.INSTAGRAM_TOKEN}
      />
      <Footer data={headerFooter} />
    </>
  ) : (
    <ErrorComp error={fetchPage} />
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;

  let payloadObj = {};
  let pathData = ctx.asPath.split('?');
  payloadObj['pathAlias'] = pathData[0]; // get the path

  payloadObj['query'] = ctx.query; // get query
  let fetchPage = null;
  try {
    fetchPage = await postRequest(process.env.API_HOST, payloadObj);
  } catch (error) {
    fetchPage = error;
    console.log(error);
  }

  let headerFooter = {};
  let error = false;
  if (fetchPage.content) {
    headerFooter = get(fetchPage, 'menus');
  } else {
    error = true;
  }
  return { fetchPage, headerFooter, error };
};

async function postRequest(url, payload) {
  let userParams = {
    baseURL: url,
    request: payload,
    oauth: {
      username: process.env.AUTH_USERNAME,
      password: process.env.AUTH_PASSWORD,
      clientSecret: process.env.CLIENT_SECRET,
      clientId: process.env.CLIENT_ID,
    },
    includedFields: [
      {
        // type: 'article',
        // jsonQuery: 'include=field_author.field_thumbnail.field_media_image,field_tags,field_thumbnail.thumbnail&fields[media--image]=name,metatag,thumbnail&fields[file--file]=uri,filename&fields[node--author]=body,title,status,path,field_thumbnail&fields[taxonomy_term--tags]=name,path'
        //Changed For TGR
        type: 'article_decoupled',
        jsonQuery:
          'include=field_author.field_thumbnail.field_media_image&fields[media--image]=name,metatag,thumbnail&fields[file--file]=uri,filename&fields[node--author]=body,title,status,path,field_thumbnail&fields[taxonomy_term--tags]=name,path',
      },
    ],
  };

  let output = {};
  let pathResolve = null;
  const oauthToken = await getOauth(userParams);

  //Auth Token and refresh tocken
  // console.log('oauthToken ', oauthToken);

  // resolve URL
  let resolve = resolveUrl(userParams, oauthToken);
  await resolve
    .then((resolved) => {
      pathResolve = resolved;
      output['routerResolve'] = resolved;
    })
    .catch((error) => {
      throw error;
    });
  // get menu
  if (pathResolve) {
    let menus = getMenus(userParams, 'jsonapi', oauthToken);
    await menus
      .then((menusjson) => {
        output['menus'] = menusjson;
      })
      .catch((error) => {
        throw error;
      });

    // get content
    let content = new PageContent(
      pathResolve,
      userParams,
      oauthToken
    ).getPageContent();
    await content
      .then((contentjson) => {
        for (let key in contentjson) {
          output[key] = contentjson[key];
        }
      })
      .catch((error) => {
        throw error;
      });
  }
  return output;
}


export default MyApp;


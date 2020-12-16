const fetch = require(`node-fetch`);
let { getOauth, getMenus, resolveUrl, PageContent} = require('ezcontent_jsonapi')


let articlePage = require.resolve("./src/pages/article.js");
let landingPage = require.resolve("./src/pages/landing.js");
require('dotenv').config({ path: '../.env' })


exports.createPages = async ({ graphql, actions, reporter }) => {

  let diffPages = await graphql(`
    query pages {
      allNodeArticle (sort: {order: DESC, fields: changed}) {
        nodes {
          id,
          path {
            alias
          },
          full_content,
          internal {
            type
          }
        }
      },
      allNodeLandingPage (sort: {order: DESC, fields: changed}) {
        nodes {
          id,
          path {
            alias,
          },
          full_content,
          internal {
            type
          }
        }
      },
    }
  `);

  for(let key in diffPages.data) {
    let nodes = diffPages.data[key].nodes;
    for(let inkey in nodes) {
      let pathAlias = nodes[inkey].path.alias;
      let nodetype = nodes[inkey].internal.type;

      let pageData = JSON.parse(nodes[inkey].full_content);

      if(pageData.page) {

        if (pageData.page.routerResolve.isHomePath) pathAlias = '/';

        console.log("Creating page for", pathAlias);

        actions.createPage({
          path: pathAlias,
          component: (nodetype === 'node__article') ? articlePage : landingPage,
          context: {
            drupal_host: process.env.DRUPAL_HOST,
            google_analytics: process.env.GOOGLE_ANALYTICS,
            environment: process.env.NODE_ENV,
            id: nodes[inkey].id
          },
        })
      }

    }
  }

}

exports.onCreateNode = async ({ node, actions }) => {
  const { createNode, createNodeField } = actions
  if(node.path && node.path.alias) {
    let pageData = await getPageData(node.path.alias);
    node['full_content'] = JSON.stringify(pageData); // a hackish way to make incremental build working
  }
}


async function getPageData(pathAlias) {
  let fetchPage = {}

  let userParams = {
    request: {
      pathAlias: pathAlias,
    },
    baseURL: process.env.DRUPAL_HOST,
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
      },
      {
        type: 'landing_page',
        jsonQuery: 'include=uid'
      }
    ]
  }

  let pathResolve = null
  const oauthToken = await getOauth(userParams);
    
  // resolve URL
  let resolve = resolveUrl(userParams, oauthToken);
  await resolve.then((resolved) => {
    pathResolve = resolved
    fetchPage['routerResolve'] = resolved
  })
  .catch(error => {
    throw error
  })

  // get menu
  if (pathResolve) {

    let menus = getMenus(userParams, "jsonapi", oauthToken);
    await menus.then((menusjson) => {
      fetchPage['menus'] = menusjson
    })
    .catch(error => {
      throw error
    })

    // get content
    let content = new PageContent(pathResolve, userParams, oauthToken).getPageContent();
    await content.then((contentjson) => {
      for (let key in contentjson) {
        fetchPage[key] = contentjson[key]
      }
    })
    .catch(error => {
      throw error
    });

  }

  if(fetchPage.menus) {
    return { 
      page: fetchPage,
      header: fetchPage.menus,
      footer: fetchPage.menus,
    };
  }
  
  return {};
}


async function postRequest(url, payload, headers = {}) {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(payload),
  })
  .then(res => {
    if (!res.ok) {
      return {}
    }
    return res.json()
  })
  .then(json => json)
  .catch(error => {
    throw error
  })
}


// sleep the API hits
function sleepAPIs(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 


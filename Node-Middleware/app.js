const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')

const port = 3000
let { getOauth, getMenus, resolveUrl, PageContent, getLanguage} = require('ezcontent_jsonapi')

const app = express()
app.use(bodyParser.json());
app.use(cors());
app.set('trust proxy', true);

app.post('/api/getcontent', async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let userParams = {
    baseURL: req.body.baseURL,
    request: req.body.request,
    oauth: {
      username: req.body.username,
      password: req.body.password,
      clientSecret: req.body.clientSecret,
      clientId: req.body.clientId,
    },
    includedFields: [
      {
        type: 'article',
        jsonQuery: 'include=field_author.field_thumbnail.field_media_image,field_tags,field_thumbnail.thumbnail&fields[media--image]=name,metatag,thumbnail&fields[file--file]=uri,filename&fields[node--author]=body,title,status,path,field_thumbnail&fields[taxonomy_term--tags]=name,path'
      }
    ]
  }
  let output = {};
  let pathResolve = null
  const oauthToken = await getOauth(userParams);
  let resolve = resolveUrl(userParams, oauthToken);
  await resolve.then((resolved) => {
    pathResolve = resolved
    output['routerResolve'] = resolved
  })
  .catch(error => {
    throw error
  })
  // get menu
  if (pathResolve) {
    let menus = getMenus(userParams, "jsonapi", oauthToken);
    await menus.then((menusjson) => {
      output['menus'] = menusjson
    })
    .catch(error => {
      throw error
    })

    // get content
    let content = new PageContent(pathResolve, userParams, oauthToken).getPageContent();
    await content.then((contentjson) => {
      for (let key in contentjson) {
        output[key] = contentjson[key]
      }
    })
    .catch(error => {
      throw error
    });
  }
  res.setHeader('Content-Type', 'application/json')
  res.json(output)

});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
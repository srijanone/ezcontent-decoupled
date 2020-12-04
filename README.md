# About EZContent
<a href="https://www.drupal.org/project/ezcontent"><strong>EZContent</strong></a>  Open Source, full-featured Drupal Distribution with many content management features out of the box, including rich content, content staging and AI/ML assisted workflows

<strong>Create and Publish content easily</strong>

Build an SEO friendly, structured content model using flexible fields, meta tags, scheme.org and large library of components (rich text, multimedia etc).

<strong>Powerful Landing Page Builder</strong>

Editors can create page layouts on the fly, without dependency on developers. With the layout builder, editors can drag and drop reusable components onto pages.

<strong>Decoupled CMS and API Ready</strong>

Retain non-negotiable CMS features such as drag & drop page builder and content preview even in a de-coupled CMS implementation.

<strong>AI powered content generation</strong>

Be one step ahead with AI and ML-based auto-tagging, content generation, and personalized content.

## Prerequisite

If you are running the EzContent drupal application and the nextjs starter kit on your local system, please make sure you create a Virtual Host for your drupal application and pass it in the .env file updating the API_HOST.

## Getting Started/Setup

<strong><a href="https://www.drupal.org/project/ezcontent">EZContent</a></strong> and <strong><a href="https://www.drupal.org/project/ezcontent_api">EZContent API</a></strong> should be installed/setup to make this decoupled code working. 

If you have <strong>EZContent</strong> already up and running, then follow these steps.

1. Get this codebase
```bash
git clone git@github.com:srijanone/ezcontent-decoupled.git 
```

2. Run Node Middleware (We can add a redis layer on the middleware for caching the data in order to create high performance)
Go inside the Node-Middleware folder and run the following commands

```bash
npm install
```

&

```bash
node app.js
```

Your node application will be up

3. Run Angular Starter Kit
visit Angular-Starter-kit folder and run the following commands.

Copy `.env.example` file and name it `.env`
```bash
cp .env.example .env
```

4. Add environment variables in `.env` file
```bash
API_HOST= # NODE API ENDPOINT (you will get after running Step 2)
DRUPAL_HOST= # EZContent's base URL 

# Below variables are also required    
# To get the JSON data for 'Layout Builder' and menu's   
USERNAME= # Drupal user (make sure this user has permission to get menu's, manage layout)   
PASSWORD= # Drupal user password   
CLIENTSECRET= # Drupal Simple Oauth client id   
CLIENTID= # Drupal Simple Oauth client secret
PROD=false
NODE_ENV=dev
HOST_PORT=4000
HOST_PORT_DEV=4200
GOOGLE_ANALYTICS=XXXX
```


5. Locate to the web folder and install NPM dependencies 
```bash
npm install
```

6. Make this codebase up and running
```bash
npm run build:ssr
```

&

```bash
node dist/ezcontent/server/main.js
```

7. Browse your decoupled Angular EZContent site at [http://localhost:4000]

## Menus

1. Add menu items under `main` for header section
2. Add menu items under `footer` (existing) menu, these will be displayed in footer section (you can also name `footer-menu` if don't have footer menu)
3. Create `privacy-policy` menu for bottom of the screen

[If you don't see menu items as linked, please edit `/admin/config/services/jsonapi/add/resource_types/menu_link_content/menu_link_content` jsonapi resource and change `link` value to `URL for link` (clear cache)]


## Decoupled Features

1. Menu (Main, footer, privacy)
1. Article content type
1. Landing page content type with layouts and EZContent's components
1. Meta tags for SEO
1. Dynamic path aliases (managed in Drupal)
1. Content <strong>Preview</strong>


## Components/widgets supported

1. Hero Banner

![Alt Hero Banner](https://ezcontent.srijan.net/sites/default/files/styles/card_list/public/2020-06/Screen%20Shot%202020-06-01%20at%202.25.46%20PM.png?itok=xrXGDm6v)

2. Gallery

![Alt Gallery](https://ezcontent.srijan.net/sites/default/files/styles/card_list/public/2020-05/screen_shot_2020-05-29_at_5.33.37_pm.png?itok=TX8EBpdg)

3. Card

![Alt Card](https://ezcontent.srijan.net/sites/default/files/styles/card_list/public/2020-05/Screen%20Shot%202020-05-29%20at%2012.48.05%20PM.png?h=be23c234&itok=53-IXNPc)

4. Embed

![Alt Embed](https://ezcontent.srijan.net/sites/default/files/styles/card_list/public/2020-05/screen_shot_2020-05-29_at_7.06.48_pm.png?itok=faFKKuTu)

5. Map

![Alt Map](https://ezcontent.srijan.net/sites/default/files/styles/card_list/public/2020-05/screen_shot_2020-05-29_at_4.17.10_pm.png?itok=1cwDrA54)

6. Social Media

![Alt Social Media](https://ezcontent.srijan.net/sites/default/files/styles/card_list/public/2020-05/screen_shot_2020-05-29_at_7.14.58_pm.png?itok=NjUS6POV)


7. Rich Text

![Alt Rich Text](https://ezcontent.srijan.net/sites/default/files/styles/card_list/public/2020-05/screen_shot_2020-05-29_at_11.56.09_pm.png?itok=FVNurtyM)

8. Image

![Alt Image](https://ezcontent.srijan.net/sites/default/files/styles/card_list/public/2020-06/Screen%20Shot%202020-06-01%20at%201.08.31%20PM.png?h=6dfffef2&itok=6WAJQ0vw)


9. Quote

![Alt Quote](https://ezcontent.srijan.net/sites/default/files/styles/card_list/public/2020-06/Screen%20Shot%202020-06-01%20at%201.12.08%20PM.png?itok=g-VAbli1)

10. Accordion/FaQ

![Alt Accordion and FaQ](https://ezcontent.srijan.net/sites/default/files/styles/card_list/public/2020-06/Screen%20Shot%202020-06-01%20at%201.17.28%20PM.png?itok=cM4tbYxd)

11. Card Grid

![Alt Card Grid View](https://ezcontent.srijan.net/sites/default/files/styles/card_list/public/2020-06/screen_shot_2020-06-02_at_3.51.54_pm.png?itok=m6ChMQJa)


## License
The MIT License (MIT)


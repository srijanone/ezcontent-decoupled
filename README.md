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


## Getting Started/Setup

<strong><a href="https://www.drupal.org/project/ezcontent">EZContent</a></strong> and <strong><a href="https://www.drupal.org/project/ezcontent_api">EZContent API</a></strong>should be installed/setup to make this decoupled code working. 

If you have <strong>EZContent</strong> already up and running, then follow these steps.

1. Get this codebase
```bash
git clone git@github.com:srijanone/ezcontent-decoupled.git 
```
2. Install NPM dependencies 
```bash
npm install
```
3. Copy `.env.example` file and name it `.env`
```bash
cp .env.example .env
```

4. Add environment variables in `.env` file
```bash
DRUPAL_HOST= # EZContent's base URL 

# Below variables are also required    
# To get the JSON data for 'Layout Builder' and menu's      
AUTH_USERNAME= # Drupal user (make sure this user has permission to get menu's, manage layout)   
AUTH_PASSWORD= # Drupal user password   
CLIENT_ID= # Drupal Simple Oauth client id   
CLIENT_SECRET= # Drupal Simple Oauth client secret
```
5. Make this codebase up and running
```bash
npm run dev
```
6. Browse your decoupled EZContent site at [http://localhost:3000]


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





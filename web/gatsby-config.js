
const fetch = require('node-fetch');
require('dotenv').config({ path: '../.env' })


const credentials = {
  client: {
    id: `${process.env.CLIENT_ID}`,
    secret: `${process.env.CLIENT_SECRET}`
  },
  auth: {
    tokenHost: `${process.env.DRUPAL_HOST}/oauth/token`
  }
};
const oauth2 = require('simple-oauth2').create(credentials);

async function getAuthToken() {
  const tokenConfig = {
    username: `${process.env.AUTH_USERNAME}`,
    password: `${process.env.AUTH_PASSWORD}`,
    grant_type: 'password'
  };
  const result = await oauth2.ownerPassword.getToken(tokenConfig);
  const accessToken = oauth2.accessToken.create(result);
  return accessToken.token;
}

// function to get all the disallowed entities
async function getDisallow() {
  let fetchResult = await fetch(`${process.env.DRUPAL_HOST}/jsonapi`)
  .then(res => res.json())
  .then(json => {
    let disallow = [];
    // get all the keys
    for (let key in json.links) {
      if (!key.startsWith('node--')) {
        disallow.push(key);
      }
    }
    return disallow;
  });
  return fetchResult;
} 

//console.log(getDisallow());

module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-prettier-eslint",
      options: {
        prettier: {
          patterns: [
            // the pattern "**/*.{js,jsx,ts,tsx}" is not used because we will rely on `eslint --fix`
            "**/*.{css,scss,less}",
            "**/*.{json,json5}",
            "**/*.{graphql}",
            "**/*.{md,mdx}",
            "**/*.{html}",
            "**/*.{yaml,yml}",
          ],
        },
        eslint: {
          patterns: "**/*.{js,jsx,ts,tsx}",
          customOptions: {
            fix: true,
            cache: true,
          },
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `jquery`,
    {
      resolve: `gatsby-source-drupal`,
      options: {
        baseUrl: `${process.env.DRUPAL_HOST}`,
        secret: `${process.env.PREVIEW_SECRET}`,
        disallowedLinkTypes: [
          'access_token--access_token',
          'action--action',
          'base_field_override--base_field_override',
          'block--block',
          'block_content--cards',
          'block_content--content_listing_component',
          'block_content--embed_block',
          'block_content--hero_media_block',
          'block_content--map_block',
          'block_content--paragraph_content',
          'block_content--referenced_cards',
          'block_content--social_media',
          'block_content--text_block',
          'block_content_type--block_content_type',
          'comment_type--comment_type',
          'configurable_language--configurable_language',
          'consumer--consumer',
          'contact_form--contact_form',
          'contact_message--personal',
          'crop--crop_16_9',
          'crop_type--crop_type',
          'date_format--date_format',
          'editor--editor',
          'embed_button--embed_button',
          'entity_browser--entity_browser',
          'entity_embed_fake_entity--entity_embed_fake_entity',
          'entity_form_display--entity_form_display',
          'entity_form_mode--entity_form_mode',
          'entity_view_display--entity_view_display',
          'entity_view_mode--entity_view_mode',
          'environment_indicator--environment_indicator',
          'ezcontent_preview--ezcontent_preview',
          'field_config--field_config',
          'field_storage_config--field_storage_config',
          'file--file',
          'filter_format--filter_format',
          'image_style--image_style',
          'jsonapi_resource_config--jsonapi_resource_config',
          'language_content_settings--language_content_settings',
          'layout--layout',
          'linkit_profile--linkit_profile',
          'liveblog_post--liveblog_post',
          'media--gallery',
          'media--image',
          'media--instagram',
          'media--smart_media_image',
          'media--tweet',
          'media--video',
          'media_type--media_type',
          'menu--menu',
          'menu_link_content--menu_link_content',
          'metatag_defaults--metatag_defaults',
          'node--author',
          'node--liveblog',
          'node--page',
          'node--smart_article',
          'node_type--node_type',
          'oauth2_token--access_token',
          'oauth2_token--auth_code',
          'oauth2_token--refresh_token',
          'oauth2_token_type--oauth2_token_type',
          'page_variant--page_variant',
          'paragraph--assets',
          'paragraph--card',
          'paragraph--card_list',
          'paragraph--cards_gallery',
          'paragraph--embed',
          'paragraph--faq',
          'paragraph--faq_qa',
          'paragraph--form',
          'paragraph--from_library',
          'paragraph--gallery',
          'paragraph--gallery_carousel',
          'paragraph--hero_media',
          'paragraph--map',
          'paragraph--quote',
          'paragraph--referenced_card',
          'paragraph--social_media',
          'paragraph--text',
          'paragraph--view',
          'paragraphs_library_item--paragraphs_library_item',
          'paragraphs_type--paragraphs_type',
          'path_alias--path_alias',
          'pathauto_pattern--pathauto_pattern',
          'rdf_mapping--rdf_mapping',
          'redirect--redirect',
          'responsive_preview_device--responsive_preview_device',
          'rest_resource_config--rest_resource_config',
          'search_page--search_page',
          'self',
          'shortcut--default',
          'shortcut_set--shortcut_set',
          'slick--slick',
          'taxonomy_term--highlights',
          'taxonomy_term--tags',
          'taxonomy_vocabulary--taxonomy_vocabulary',
          'user--user',
          'user_role--user_role',
          'view--view',
          'webform--webform',
          'webform_options--webform_options',
          'webform_submission--contact',
          'workflow--workflow'
        ],
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer {token}"
        },
        tokenPromise: getAuthToken()
      },
    }
  ],
}

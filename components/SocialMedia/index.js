import React, { useEffect } from "react";
import BlockTitle from "../BlockTitle";
import InstagramEmbed from 'react-instagram-embed';
import get from "lodash/get";
// import "./Socialmedia.css";

const SocialMediaComp = ({type, attributes, data, landingPageCheck, instagram_token_value}) => {
  
  useEffect(() => {
    if (type !== "media--tweet") return;
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.getElementsByClassName("twitter-tweet")[0].appendChild(script);
  }, []);
  let url = (type === "media--tweet") ? get(attributes, "embed_code") : get(attributes, "field_media_oembed_instagram")
  if (!url) return null;
  if (type === "media--tweet") {
    return (
      <>
      <BlockTitle blockTitle={data} landingPageCheck={landingPageCheck}/>
      <div className="w-100 text-center">
        <div className="d-inline-block mt-0 mb-0 ml-auto mr-auto mw-100">
          <blockquote className="twitter-tweet mr-auto ml-auto" data-lang="en">
            <a href={url}> </a>
          </blockquote>
        </div>
      </div>
      </>
    );
  }
  
  if (type === "media--instagram") {
    return (
      <>
      <BlockTitle blockTitle={data} landingPageCheck={landingPageCheck}/>
      <div className="pb-3 mt-3 mb-3">
        <InstagramEmbed
          url={url.split("?")[0]}
          clientAccessToken={instagram_token_value}
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
      </div>
      </>
    );
  }

};

export default SocialMediaComp;

import React from "react";
import get from "lodash/get";
import BlockTitle from "../BlockTitle";

function getYoutubeVideo(url) {
  const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return url.match(p) ? `https://www.youtube.com/embed/${RegExp.$1}` : "";
}

function getVimeoVideo(url) {
  const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
  const parsed = url.match(vimeoRegex);
  return `//player.vimeo.com/video/${parsed[1]}`;
}

function getVideoFromURL(url) {
  if (!url) return "";
  if (url.indexOf("youtu") !== -1) return getYoutubeVideo(url);
  if (url.indexOf("vimeo") !== -1) return getVimeoVideo(url);
}

export default (props) => {
  const baseUrl = props.baseUrl;
  let included = [];
  included.push(get(props, "data.items"));
  const Render = () =>
    included.map(element => {
      if (get(element, "imageData.field_media_video_embed_field")) {
        const url = get(element, "imageData.field_media_video_embed_field");  
        return (
          <div
            className="text-center embed-responsive embed-responsive-16by9"
            key={`video_${get(element, "imageData.drupal_internal__vid")}`}
          >
            <iframe
              className="border-0 embed-responsive-item"
              width="560"
              height="315"
              src={getVideoFromURL(url)}
            ></iframe>
          </div>
        );
      } else {
        const imagePath = get(element, "file.uri.url");
        return (
          <div className="text-center mt-3 mb-3" key={`image_${get(element, "file.drupal_internal__fid")}`}>
            {imagePath ? (<img className="mw-100" src={`${baseUrl}${imagePath}`} />) : null}
          </div>
        );
      }
    });
    return (
      <>
        <BlockTitle blockTitle={props.data} landingPageCheck={props.landingPageCheck}/>
        {Render()}
      </>
    )
};

import React, { useEffect } from "react";
import get from "lodash/get";
import BlockTitle from "../BlockTitle";
import {Helmet} from "react-helmet";

export default (props) => {
  const data = props.data;
  const baseUrl = props.baseUrl;
  const landingPageCheck = props.landingPageCheck;
  const title = get(data,"attributes.field_title") ? get(data,"attributes.field_title") : null;
  
  function setColorBox() {
    $(".gallery-item").colorbox({
      rel: "gallery-item",
      maxWidth: "100%",
      maxHeight: "100%"
    });
  }
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.jacklmoore.com/colorbox/jquery.colorbox.js";
    script.async = true;
    script.onload = () => setColorBox();
    document.getElementsByClassName("gallery-block")[0].appendChild(script);
  }, []);
  
  const style = {
      height: '245px',
      objectFit: 'cover'
    };
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://www.jacklmoore.com/colorbox/example1/colorbox.css"
        />
      </Helmet>
      <BlockTitle blockTitle={data} landingPageCheck={landingPageCheck}/>
      <div className="container gallery-block paragraph--type--gallery">
        {title && <div className="gc--field--name-field-title">{title}</div>}
        <div className="row mt-2 text-center text-lg-left field--name-field-media-items">
          {data.items &&
            data.items.map(({ file, derivatives },i) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12 field--item"
                key={`pg__${i}_${file.drupal_internal__fid}`}
              >
                <a
                  href={`${baseUrl}${get(derivatives, "gallery_colorbox.url")}`}
                  className="field--name-field-media-image h-100 gallery-item d-flex"
                >
                  <img style={style}
                    className="gallery-thumbnail mw-100"
                    src={`${baseUrl}${get(derivatives, "gallery.url")}`}
                    alt=""
                  />
                </a>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

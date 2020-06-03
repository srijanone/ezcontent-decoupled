import React from "react";
import get from "lodash/get";
import BlockTitle from "../BlockTitle";
// import "./style.css";

export default props => {
  
  let data = [];
  data = props.data.items.map(x => {
    const article = {
      title: x.article.title,
      path: x.article.path.alias,
      summary: x.article.field_summary,
      image: (get(x, "file.uri.url")) ? props.baseUrl + (get(x, "file.uri.url").replace("/sites/default/files/","/sites/default/files/styles/card_list/public/")) : null
    };
    return article;
  });
  return (
    <>
    <BlockTitle blockTitle={props.data} landingPageCheck={props.landingPageCheck}/>
    <div className="text-left paragraph--type--referenced-card">
      <div className="field--name-field-article">
          {data.map((element, index) => {
            return (
              <div className="field__item field--type-image" key={index}>
                <div className="block-field-blocknodearticletitle" key={index}>
                  {element.image ? <div className="mb-25"><img src={`${element.image}`} /> </div>: ''}
                  <a href={`${element.path}`}>{element.title}</a>
                </div>
                {element.summary ? <div className="referenced-summary">{element.summary}</div> : ''}
              </div>
            );
          })}
      </div>
    </div>
    </>
  );
};

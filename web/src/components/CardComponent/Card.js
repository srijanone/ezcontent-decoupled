import React from "react";
// import "./style.css";

export default props => {
  const {
    FieldLink,
    FieldLinkTitle,
    ParagraphContent,
    ShortTitle,
    Subhead,
    Title,
    ImageUrl,
    layout,
    viewMode
  } = props;
  let ImageAlignClass =
    layout === "card_right_media"
      ? "layout__region--second"
      : layout === "card_left_media"
      ? "layout__region--first"
      : "w-100 text-center";
  let ImageClass =
    layout === "none" ? "mw-100 img-fluid" : "mw-100 img-fluid mb-3";
  let TextContainerClass =
    layout === "card_right_media"
      ? "layout__region--first order-first"
      : layout === "card_left_media"
      ? "layout__region--second"
      : "";
  let RowClass = layout !== "none" ? "layout layout--twocol-section layout--twocol-section--50-50" : "";
  let paraTypeCss = "paragraph--type--card";
  if(viewMode === "cards_grid_3xn" && layout === "none"){
    paraTypeCss = "layout--threecol-section-col"
  }
  
  return (
    <div className={`${paraTypeCss} ${layout}`}>
      <div className={RowClass}>
        {ImageUrl && (
          <div className={ImageAlignClass}>
            <img className={ImageClass} src={ImageUrl} />
          </div>
        )}
        <div className={TextContainerClass}>
          {Title && (
            <div className="mt-3">
              <h3>{Title}</h3>
            </div>
          )}
          {ShortTitle && (
            <div className="border-bottom field--name-field-short-title border-white mt-2">
              {ShortTitle}
            </div>
          )}
          {Subhead && (
            <div className="mt-2 field--name-field-subhead">
              {Subhead}
            </div>
          )}
          {ParagraphContent ? (
            <div
              dangerouslySetInnerHTML={{ __html: ParagraphContent }}
              className="mt-2"
            />
          ) : null}
          {FieldLink && FieldLinkTitle && (
            <div className="text-right pt-3 border-top border-white">
              <a className="btn btn-primary rounded-0" href={FieldLink}>
                {FieldLinkTitle}
              </a>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

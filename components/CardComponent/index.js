import React from "react";
import get from "lodash/get";
import Card from "./Card";
import BlockTitle from "../BlockTitle";
import handleImageInProcessedText from "../../common/helper";

export default props => {
  let {cardListContent,view_mode, data}= props

  let cardViewMode = get(view_mode, "drupal_internal__id") ? get(view_mode, "drupal_internal__id") : null;

  const block =  (  
    <>
      <BlockTitle blockTitle={props.data} landingPageCheck={props.landingPageCheck}/>
      {
        cardListContent.map((item,i) =>{
          return  (
            <Card
              key = {`cards_item_${i}`}
              FieldLink = {get(item, "card.field_link.url") ? get(item, "card.field_link.url") : null}
              FieldLinkTitle = {get(item, "card.field_link.title") ? get(item, "card.field_link.title") : null}
              ParagraphContent={get(item, "card.field_summary.processed") ? handleImageInProcessedText(get(item, "card.field_summary.processed"), props.baseUrl ) : null}
              ShortTitle={get(item, "card.field_short_title") ? get(item, "card.field_short_title") : null}
              Subhead={get(item, "card.field_subhead") ? get(item, "card.field_subhead") : null}
              Title={get(item, "card.field_title") ? get(item, "card.field_title") : null}
              ImageUrl={get(item,"file.uri.url") ? (cardViewMode === "cards_grid_3xn") ? props.baseUrl + get(item,"file.uri.url").replace("/files/","/files/styles/card_list/public/") : props.baseUrl + get(item,"file.uri.url")  : null}
              layout={get(item,"layout.drupal_internal__id") ? get(item,"layout.drupal_internal__id") : "none"}
              viewMode={cardViewMode}
            />
          )
        })
      }
    </>
  )
  return (
    block
  )
};

import React from "react";
import CardList from "./CardList";
import get from "lodash/get";
import { isNull } from "util";
import BlockTitle from "../BlockTitle";
// import "./style.css";

export default class CardListGenerator extends React.Component {
  constructor() {
    super();
  }

  render() {
    let {cardListContent,cardListData,view_mode}= this.props
    let viewMode = get(view_mode, "drupal_internal__id") ? get(view_mode, "drupal_internal__id") : null;
    const block =  (  
        <>
          {
            cardListContent.map((item,i) =>     {
              return  (
                <CardList
                  key = {`carlist_item_${i}`}
                  FieldLink = {get(item, "card.field_link.url") ? get(item, "card.field_link.url") : null}
                  FieldLinkTitle = {get(item, "card.field_link.title") ? get(item, "card.field_link.title") : null}
                  ParagraphContent =  {get(item,"card.field_summary.processed") ? get(item,"card.field_summary.processed") : null}
                  ShortTitle = { get(item,"card.field_short_title") ? get(item,"card.field_short_title") : null}
                  Subhead = { get(item,"card.field_subhead") ? get(item,"card.field_subhead") : null}
                  Title = { get(item,"card.field_title") ? get(item,"card.field_title") : null}
                  ImageUrl = {get(item,"file.uri.url") ? this.props.baseUrl + get(item,"file.uri.url") : null}
                  layout = {get(item,"layout.drupal_internal__id") ? get(item,"layout.drupal_internal__id") : "none"}
                  viewMode = {viewMode}
                  fieldName = {get(cardListData, "parent_field_name")}
                  mainTitle = {get(cardListData, "field_title")}
                  index = {i}
                />
              )
            }        
            )
          }
      </>
    )

    
    return (
      <>
      <BlockTitle blockTitle={this.props.data} landingPageCheck={this.props.landingPageCheck}/>
      <div className={viewMode==='paragraph.cards_grid' ? `layout--threecol-section`:''}>
        {block}
      </div>
      </>
    )
  }
}

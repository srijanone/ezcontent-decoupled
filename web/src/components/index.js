import React, { Fragment,useEffect } from "react";
import MetaTag from "./MetaTag";
import Text from "./TextComponent";
import SocialMedia from "./SocialMedia"
import Paragraph from "./ParagraphAssets";
import Gallery from "./Gallery";
import GalleryCarousel from "./GalleryCarousel";
import EmbedComponent from "./EmbedComponent"
import Quote from "./QuoteComponent";
import Map from "./MapComponent";
import Faq from "./FaqComponent";
import HeroComponent from "./HeroComponent";
import Reference from "./ReferenceComponent";
import get from "lodash/get";
import CardList from "./CardList";
import Card from "./CardComponent";
import QuestionAnswer from "./Q&AComponent";
import handleImageInProcessedText from "../common/helper";
import BreadCrumb from "./BreadCrumb";
import AlertComponent from "./AlertComponent";
import AuthoredByComponent from "./AuthoredByComponent";
import AuthoredOnComponent from "./AuthoredOnComponent";
import BodyComponent from "./BodyComponent";
import TitleField from "./TitleField";

export default props => {
  let authorData = props.data.included_fields ? props.data.included_fields.filter(({ type }) => type === 'node--author') : false;
  let authorMedia = null;
  let authorMediaId = null;
  let authorThumb = null;
  let hide = "d-none";
  let AuthorTitle = null;
  let AuthorTitleUrl = null;
  let summary = null;
  let AuthorIcon = null;
  let authorThumbId = null;
  let landingPageCheck = false;
  let colArr = {
    layout_onecol: 12,
    layout_twocol_section: 6,
    layout_threecol_section: 4,
    layout_fourcol_section: 3,
    full_width_content: 12
  }


  useEffect(()=>{
    if(props.data.routerResolve.redirect)
    {
      window.history.pushState("", "", get(props.data.routerResolve, "redirect[0].to"));
    }
  },[])

  if (props.data.routerResolve && props.data.routerResolve.entity.bundle === 'landing_page') {
    landingPageCheck = true;
  }

  if(authorData){
    authorData.map((val)=>{
      AuthorTitle = get(val, "attributes.title");
      AuthorTitleUrl = get(val, "attributes.path.alias") ? get(val, "attributes.path.alias") : null;
      summary = get(val, "attributes.body.processed") ? get(val, "attributes.body.processed") : null;
      summary = handleImageInProcessedText(summary,get(props,'baseUrl'));
      authorMedia = get(val, "relationships.field_thumbnail.data");
      if(authorMedia && authorMedia.type === "media--image"){
        authorMediaId = authorMedia.id;
      }
      if(authorMediaId){
        authorThumb = props.data.included_fields ? props.data.included_fields.filter(({ type,id }) => (type === 'media--image' && id === authorMediaId)) : false;
      }

      if(authorThumb){
        authorThumb.map((mediaData)=>{
          let authorThumbData = get(mediaData,"relationships.thumbnail.data");
          if(authorThumbData.type && authorThumbData.type === "file--file"){
            authorThumbId = authorThumbData.id;
          }
        });

        if(authorThumbId){
          let authorImg = props.data.included_fields ? props.data.included_fields.filter(({ type,id }) => (type === 'file--file' && id === authorThumbId)) : false;
          if(authorImg){
            authorImg.map((imagePath)=>{
              AuthorIcon = get(imagePath, "attributes.uri.url") ? get(props,'baseUrl') + get(imagePath, "attributes.uri.url") : null;
            })
          }
        }
      }
    });
    if(AuthorTitleUrl || AuthorTitle || summary || AuthorIcon){
      hide = "";
    }
  }

  let content = get(props,'data.content');
  let baseUrl = get(props,'baseUrl');
  let pageTitle = get(props,'data.node_basic_data.title');
  const showPageTitle = get(props, "data.node_basic_data.path.alias")!=="/home";
  let subhead = (!landingPageCheck) ? get(props,'data.node_basic_data.field_subhead') : null;
  let shortTitle = (!landingPageCheck) ? get(props,'data.node_basic_data.field_short_title') : null;
  let breadcrumbData = get(props,'data.breadcrumb');
  
  const Author =  (  
    <>
      <div className={hide}>
        <div className="field__label">Author</div>
          <h2 className="node__title">
            {/* { AuthorTitle  ? <a href={AuthorTitleUrl}>{AuthorTitle}</a> : '' } */}
            { AuthorTitle  ? AuthorTitle : '' }
          </h2>
          <div className="row">
            <div className="col-md-4">
              { AuthorIcon ? <img src = {AuthorIcon} /> : ''}
            </div>
            { 
                summary ?
                <div
                  dangerouslySetInnerHTML={{ __html: summary }}
                  className="mt-2 col-md-8"
                /> :
                ''
            }
          </div>
      </div>
    </>
  )

  function sortByWeight(arr) {
    const sortArr = arr;
    sortArr.sort((a, b) => {
      if (a[0] && b[0] && Number.isInteger(a[0].region_num)) {
        return a[0].region_num - b[0].region_num
      }
    })
    return sortArr;
  }

  function switchBlock(comp,keyVal,layoutId,landingPageCheck){
    if(comp){
      
      switch(comp.type) {
        case "text_block":    
          let textData = "";
          if(layoutId === "paragraphs"){
            textData = get(comp,"attributes.field_body.processed") ? get(comp,"attributes.field_body.processed") : '';
          }else{
            textData = get(comp,"attributes.body.processed") ? get(comp,"attributes.body.processed") : '';
          }    
          textData = handleImageInProcessedText(textData, baseUrl);         
          return <Text key={`text_block_${keyVal}`} text={textData} medium="1" data={comp} landingPageCheck={landingPageCheck}/>;
        case "social_media":
          return <SocialMedia key={`social_media_${keyVal}`} type={comp.media ? comp.media.type : ''} attributes={comp.media ? comp.media.attributes : ''} data={comp} landingPageCheck={landingPageCheck}/>;
        case "assets":
          return <Paragraph key={`assets_${keyVal}`} data={comp} baseUrl={baseUrl} landingPageCheck={landingPageCheck}/>;
        case "gallery":
          if(get(comp,"view_mode.drupal_internal__id") === "paragraph.gallery_carousel"){
            return <GalleryCarousel key={`gallery_c_${keyVal}`} data={comp} baseUrl={baseUrl} landingPageCheck={landingPageCheck}/>;
          }else{
            return <Gallery key={`gallery_${keyVal}`} data={comp} baseUrl={baseUrl} landingPageCheck={landingPageCheck}/>;
          }
        case "embed_block":
          return <EmbedComponent key={`embed_${keyVal}`} field_script={comp.attributes.field_script} landingPageCheck={landingPageCheck} data={comp}/>;
        case "quote":
          return <Quote key={`quote_${keyVal}`} data={comp} landingPageCheck={landingPageCheck}/>;
        case "map":
        case "map_block":
          return <Map key={`map_${keyVal}`} data={comp} landingPageCheck={landingPageCheck} baseUrl={baseUrl}/>;
        case "faq":
          return <Faq key={`faq_${keyVal}`} data={comp} landingPageCheck={landingPageCheck} baseUrl={baseUrl}/>;
        case "cards":
          return <Card key={`card__${keyVal}`} cardListData={comp.attributes} cardListContent={comp.items} view_mode={comp.view_mode} data={comp} baseUrl={baseUrl} landingPageCheck={landingPageCheck}/>;
        case "card_list":
          return <CardList key={`card_list_${keyVal}`} cardListData={comp.attributes} cardListContent={comp.items} view_mode={comp.view_mode} data={comp} baseUrl={baseUrl} landingPageCheck={landingPageCheck}/>;
        case "hero_media":
          return <HeroComponent key={`hero_${keyVal}`} data={comp} baseUrl={baseUrl} landingPageCheck={landingPageCheck}/>;
        case "referenced_card":
          return <Reference key={`reference_${keyVal}`} data={comp} baseUrl={baseUrl} landingPageCheck={landingPageCheck}/>;
        case "faq_qa":
          return <QuestionAnswer key={`QuestionAnswer_${keyVal}`} data={comp} landingPageCheck={landingPageCheck} baseUrl={baseUrl}/>;
        case "alert_banner":
          return <AlertComponent key={`alert_${keyVal}`} data={comp} landingPageCheck={landingPageCheck}/>;
        case "title":
          return <TitleField key={`title_${keyVal}`} data={comp} landingPageCheck={landingPageCheck}/>;
        case "body":
          return <BodyComponent key={`body_${keyVal}`} data={comp} landingPageCheck={landingPageCheck}/>;
        case "created":
          return <AuthoredOnComponent key={`authoredon_${keyVal}`} data={comp} landingPageCheck={landingPageCheck}/>;
        case "uid":
          return <AuthoredByComponent key={`authoredby_${keyVal}`} data={comp} landingPageCheck={landingPageCheck}/>;
        case "default":
          return null;
      }
    }
  }

  let block = '';
  
  if(content) {
    block = (  
      <>
        {
          content.map((item,i) => (
            <div className={item.rowCssClass ? (landingPageCheck) ? `row ${item.rowCssClass}` : item.rowCssClass : ''} key={`block_${i}`}>
              { 
                sortByWeight(item.components).map((compVal,j)=>{
                  let layoutId = item.layout_id;
                  if(landingPageCheck){
                    return( 
                      <div className={
                        item.layout_id == "full_width_content"
                          // ? "container"
                          ? "col-12"
                          : 'col-' + colArr[item.layout_id]
                      }
                      key={`block__${i}${j}`}>
                        {
                          compVal.map((comp,k) =>{  
                              return switchBlock(comp,`${i}${j}${k}`,layoutId,landingPageCheck) 
                          })
                        }
                      </div>
                    )
                  }else{
                    return (
                      <Fragment key={`${i}__${j}`}>
                        {
                          compVal.map((comp,k) =>{  
                            return switchBlock(comp,`${i}${j}${k}`,layoutId,landingPageCheck)
                          })
                        }
                      </Fragment>
                    )
                  }
                }) 
              }
              </div>
          ))
        }
      </>
    )
  }
  

  return (
    <Fragment>
      <MetaTag meta={get(props,"data.node_basic_data")} />
      <div id="main-wrapper" className={landingPageCheck ? "ezcontent-main-wrapper landing-page-holder" : "ezcontent-main-wrapper"}>
        <div className={landingPageCheck ? "mt-4 mb-4" : "container mt-4 mb-4"}>
          {breadcrumbData ? <BreadCrumb landingPageCheck={landingPageCheck} data={  breadcrumbData}/> : null}
          { landingPageCheck && !showPageTitle ? null : <h1 className="pb-3">{ pageTitle }</h1> }
          {/* { shortTitle ? <div className="mb-2">{shortTitle}</div> : null }
          { subhead ? <div className="mb-2">{subhead}</div> : null } */}
          {block}
          {Author}
        </div>
      </div>
    </Fragment>
  )
}

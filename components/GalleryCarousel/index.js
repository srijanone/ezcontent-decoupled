import React, { Component } from "react";
import {Helmet} from "react-helmet";
import Slider from "react-slick";
import get from 'lodash/get';
import BlockTitle from "../BlockTitle";

// import './GalleryCarousel.css';

export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {
    const { data, baseUrl, landingPageCheck } = this.props;
    const { items } = data;
    const imageObj = items ? items : false;
    const title = get(data,"attributes.field_title") ? get(data,"attributes.field_title") : null;
    const field_body = get(data,"attributes.field_body.processed") ? get(data,"attributes.field_body.processed") : null;
    const field_link = get(data,"attributes.field_link.uri") ? get(data,"attributes.field_link.uri") : null;
    const field_link_title = get(data,"attributes.field_link.title") ? get(data,"attributes.field_link.title") : null;
    return (
      <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href={`${baseUrl}/modules/contrib/slick/css/theme/slick.theme--asnavfor.css`} />
      
      </Helmet>
      <BlockTitle blockTitle={data} landingPageCheck={landingPageCheck}/>
      <div>
        {title && <div className="gc--field--name-field-title">{title}</div>}
        
        <style jsx global>{`
          .media--background {
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
          }
        `}
        </style>
        <Slider
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}
          arrows={false}
        >
          {imageObj && imageObj.map((data, i) => {
            const img = get(data, 'file.uri.url');
            return (
            <div className="gallery-block pb-4" key={`gb__${i}_${get(data,"file.drupal_internal__fid")}`}>
              <div className="media--background banner position-relative w-100" style={{backgroundImage: `url(${baseUrl}${img})`}}></div>
            </div>
          )})}
        </Slider>
        <Slider
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          dots={true}
          className={'paragraph--type--gallery-carousel'}
          dotsClass={'slick-dots slick-dotted slick-slider'}
          arrows={false}

        >
          {imageObj && imageObj.map((data,i) => {
            const img = get(data, 'file.uri.url');
            return (
             <React.Fragment key={`gb__${i}_${get(data,"file.drupal_internal__fid")}`}></React.Fragment>
          )})}
        </Slider>
        {field_body ? <div dangerouslySetInnerHTML={{ __html: field_body }} /> : null }
        {field_link ? <><div><a href={field_link}>{field_link_title ? field_link_title : field_link}</a></div></> : null }
      </div>
      </>
    );
  }
}

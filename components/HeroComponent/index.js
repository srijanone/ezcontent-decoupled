/* eslint-disable */
import React from 'react';
import get from 'lodash/get';
import Slider from 'react-slick';
// import './HeroComponent.css';
import hexToRgba from 'hex-to-rgba';
import BlockTitle from "../BlockTitle";


function cleanDescription(str) {
  if (!str) return '';
  const cleanedstr = str.replace(/(<([^>]+)>)/ig, '');
  if (cleanedstr) return cleanedstr.substring(0, 250);
  return '';
}



class HeroBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  mapButtons = (btn, separator, index) => {
    if (btn.link === '' || btn.title === '') {
      return null;
    }
    return (<a key={String(index)} className="button__group btn btn-primary rounded-0" href={btn.link}>{btn.title}</a>);
  }

  layoutToggle = (layout) => {
    switch (layout) {
      case 'right': return 'hero_banner-body hero_media_content w-100 position-absolute text-right';
      case 'left': return 'hero_banner-body hero_media_content w-100 position-absolute text-left';
      case 'center': return 'hero_banner-body hero_media_content w-100 position-absolute text-center';
      default: return 'hero_banner-body hero_media_content w-100 position-absolute'
    }
  }
  heroComponent = (heroAsset) => {
    return (
      <>
        {/* <div className="hero_banner_wrapper paragraph--type--card paragraph--view-mode--hero-media position-relative w-100" style={{ backgroundImage: `url(${heroAsset.image})`, backgroundRepeat: `no-repeat` }}> */}
        <div className="hero_banner_wrapper paragraph--type--card paragraph--view-mode--hero-media position-relative w-100">
          <img src={heroAsset.image} />
          <div className={this.layoutToggle(heroAsset.textPosition)} style={{ backgroundColor: heroAsset.bgColor }}>
            <div className="hero_banner_title field--name-field-title mr-0 text-black pt-0 pb-0 pr-2 pl-2 w-100">{heroAsset.title}</div>
            <div className="hero_banner_short_title pt-1 pl-2 pb-0" text_color={heroAsset.text_color}>{heroAsset.field_short_title}</div>
            <div className="hero_banner_subhead field--name-field-subhead pt-1 pl-2 pb-0" text_color={heroAsset.text_color}>{heroAsset.field_subhead}</div>
            <div className="hero_banner_text_desc mt-1 mb-1 mr-0 pl-2 text-black">
              {heroAsset.description}

            </div>
            <div className="hero_banner_btn_wrapper float-right">
              {heroAsset.url.map(
                (item, index) => {
                  return this.mapButtons(item, 0, index)
                }
              )
              }
            </div>
          </div>
        </div>
      </>
    )
  }



  render() {
    const {
      items,
    } = this.props.data;

    const baseUrl = this.props.baseUrl;

    const heroAssetArr = items.map((heroData, index) => {
      let imageUrlPath = get(heroData, 'derivatives.hero_media.url') ? `${baseUrl}${get(heroData, 'derivatives.hero_media.url')}` : null
      if (process.env.IS_TGR == "true") {
        imageUrlPath = get(heroData, 'derivatives.hero_media.url') ? `${get(heroData, 'derivatives.hero_media.url')}` : null
      }
      return ({
        id: get(items[index], 'id') || index,
        // image: get(heroData,'file') ? `${baseUrl}${get(heroData, 'file.uri.url')}` : null,
        image: imageUrlPath,
        title: get(heroData, 'card.field_title') || '',
        description: cleanDescription(get(heroData, 'card.field_summary.processed')) || '',
        field_subhead: get(heroData, 'card.field_subhead') || '',
        bgColor: hexToRgba(
          get(heroData, "card.field_text_background_color.color"),
          get(heroData, "card.field_text_background_color.opacity")
        ),
        textPosition: get(heroData, "card.field_text_position"),
        field_short_title: get(heroData, 'card.field_short_title') || '',
        url: [
          {
            link: get(heroData, 'card.field_link.url') || '',
            title: get(heroData, 'card.field_link.title') || '',
            video_url: 0,
          },
        ],
      })
    });
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
      adaptiveHeight: true,
    };
    if (!heroAssetArr) return null;
    if (heroAssetArr.length > 1) {
      return (
        <div className="">
          <style jsx global>{`
            .slick-next:before, .slick-prev:before {
              color: #6BA439 !important;
            }
            .slick-next {
              right: 0px;
            }
            .slick-prev {
              left: 0px;
            }
          `}</style>
          <Slider {...settings}>
            {heroAssetArr.map(heroAsset => heroAsset && (
              <div key={heroAsset.id}>
                {this.heroComponent(heroAsset)}
              </div>
            ))}
          </Slider>
        </div>
      );
    }
    return (
      <>
        <BlockTitle blockTitle={this.props.data} landingPageCheck={this.props.landingPageCheck} />
        <div className="mt-4 pb-2 block--type-hero-media-block">
          {heroAssetArr[0] && (
            this.heroComponent(heroAssetArr[0])
          )}
        </div>
      </>
    );
  }
}

export default HeroBanner;
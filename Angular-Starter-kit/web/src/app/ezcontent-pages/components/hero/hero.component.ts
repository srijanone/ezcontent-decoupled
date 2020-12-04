import { Component, OnInit, Input } from "@angular/core";
import {SlickCarouselComponent} from 'ngx-slick-carousel'
import * as _ from "lodash";


@Component({
  selector: "app-hero",
  templateUrl: "./hero.component.html",
  styleUrls: ["./hero.component.scss"]
})
export class HeroComponent implements OnInit {
  @Input() data: any;
  @Input() imageBase: any;
  slideConfig: any;
  heroAssetArr: any = [];
  layoutPos: any;
  constructor() {
    this.slideConfig = {
      infinite: true,
      speed: 500,
      arrows: true,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
      adaptiveHeight: true
    };
  }
  ngOnInit() {
    this.heroAssetArr = this.data.map((heroData: any, index: any) => ({
      image: _.get(heroData, "derivatives.hero_media") ? `${this.imageBase}${heroData.derivatives.hero_media.url}` : '',
      title: heroData.card.field_title || "",
      description:
        this.cleanDescription(heroData.card.field_summary ? heroData.card.field_summary.value : ''),
      field_subhead: heroData.card.field_subhead || "",
      field_short_title:heroData.card.field_short_title || "",
      url: [
        {
          link: heroData.card.field_link ? heroData.card.field_link.url : "",
          title: heroData.card.field_link ? heroData.card.field_link.title : "",
          video_url: 0
        }
      ],
      bgColor: this.hexToRGB(
        heroData.card.field_text_background_color.color,
        heroData.card.field_text_background_color.opacity
      ),
      textPosition: this.heroLayout(heroData.card.field_text_position)
    }));
  }

  cleanDescription(str) {
    if (!str) return "";
    const cleanedstr = str.replace(/(<([^>]+)>)/gi, "");
    if (cleanedstr) return cleanedstr.substring(0, 250);
    return "";
  }

  heroLayout(position) {
    switch(position){
      case "right":
        return "hero_banner-body hero_media_content w-100 position-absolute text-right";
      case "left":
        return "hero_banner-body hero_media_content w-100 position-absolute text-left";
      case "center":
        return "hero_banner-body hero_media_content w-100 position-absolute text-center";
      default:
        return "hero_banner-body hero_media_content w-100 position-absolute"
    }
  }

  hexToRGB(hex: string, alpha: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    if (alpha) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      return `rgba(${r}, ${g}, ${b})`;
    }
  }

}

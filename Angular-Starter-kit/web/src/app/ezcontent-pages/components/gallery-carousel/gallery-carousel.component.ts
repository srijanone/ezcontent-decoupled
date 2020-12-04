import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gallery-carousel',
  templateUrl: './gallery-carousel.component.html',
  styleUrls: ['./gallery-carousel.component.scss']
})
export class GalleryCarouselComponent implements OnInit {
  setting = {
    infinite: true,
    dots: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    mouseWheel: true,
    adaptiveHeight: true,
    lazyLoad: true,
  };
  @Input() images: any;
  @Input() imageBase: any;
  
  constructor() { }

  ngOnInit() {}

}

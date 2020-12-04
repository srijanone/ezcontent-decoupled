import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
declare var $: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  @Input() images: any;
  @Input() imageBase: any;
  @Input() bodyText: any;
  @Input() title: any;

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private platform: any) { }

  ngOnInit() {
    if (this.bodyText && this.bodyText.value) {
      this.bodyText = this.bodyText.value;
    }

    if (isPlatformBrowser(this.platform)) {
      let script: any = document.createElement("script");
      script.src = "https://www.jacklmoore.com/colorbox/jquery.colorbox.js";
      script.async = true;
      script.onload = function() {
        $(".gallery-item").colorbox({
          rel: "gallery-item",
          maxWidth: "80%",
          maxHeight: "100%"
        });
      };
      let link = document.createElement('link'); 
      link.rel = 'stylesheet';  
      link.type = 'text/css'; 
      link.href = 'https://www.jacklmoore.com/colorbox/example1/colorbox.css';  

      if (document.getElementsByClassName("gallery-block")[0]) {
        document.getElementsByClassName("gallery-block")[0].appendChild(script);
        let head = document.getElementsByTagName('HEAD')[0];
        head.appendChild(link);
      }
    }

  }

}

import { Component, OnInit, Input } from "@angular/core";
import * as _ from "lodash";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import handleImageInProcessedText from "../../common/helper";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  @Input() path: any;
  @Input() data: any;
  location: any;
  title: any;
  body: any;
  link: any;
  subTitle: any;
  url: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.location = _.get(this.data, "field_map");
    this.title = _.get(this.data, "field_title");
    this.body = _.get(this.data, "field_body");
    this.link = _.get(this.data, "field_link");
    this.subTitle = _.get(this.data, "field_short_title");
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.google.com/maps?hl=en&q=${encodeURI(
        this.location
      )}&t=m&z=14&output=embed`
    );
    if(this.body){
      this.body.value = handleImageInProcessedText(this.body.value,this.path);
    }
    
  }
}

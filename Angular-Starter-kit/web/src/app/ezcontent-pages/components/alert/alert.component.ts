import { Component, OnInit, Input } from "@angular/core";
import * as _ from "lodash";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent implements OnInit {
  @Input() data: any;
  body: any;
  color: any;
  opacity: any;
  btitle: any;
  btitleVisibility: any;

  constructor() {
    
  }

  ngOnInit() {
    if(this.data.attributes.field_body) {
      this.body = this.data.attributes.field_body.value;
    } else if(this.data.attributes.body) {
      this.body = this.data.attributes.body.value;
    }else {
      this.body = this.data;
    }

    if(this.data.attributes.field_background_color) {
      this.color = this.data.attributes.field_background_color.color
    }

    if(this.data.attributes.field_background_color) {
      this.opacity = this.data.attributes.field_background_color.opacity;
    }

    this.btitle = _.get(this.data, "block_layout_settings.label");
    this.btitleVisibility = _.get(this.data, "block_layout_settings.label_display");
    if(this.btitleVisibility !== 'visible'){
      this.btitle = null;
    }
  }
}

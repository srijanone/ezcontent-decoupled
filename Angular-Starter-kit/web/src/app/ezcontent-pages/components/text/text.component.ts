import { Component, OnInit, Input } from "@angular/core";
import handleImageInProcessedText from "../../common/helper";

@Component({
  selector: "app-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.scss"]
})
export class TextComponent implements OnInit {
  @Input() data: any;
  @Input() path: any;

  constructor() {}

  ngOnInit() {
    if(this.data.field_body) {
      this.data = this.data.field_body.value;
    } else if(this.data.body) {
      this.data = this.data.body.value;
    }else {
      this.data = this.data;
    }
    this.data = handleImageInProcessedText(this.data,this.path);
  }
}

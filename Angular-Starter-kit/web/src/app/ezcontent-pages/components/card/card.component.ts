import { Component, OnInit, Input } from "@angular/core";
import handleImageInProcessedText from "../../common/helper";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() data: any;
  @Input() layout_type: any;
  @Input() path: any;

  constructor() {}

  ngOnInit() {
    if(!this.layout_type) this.layout_type = 'card'; // set default
    if(!this.data.layout) this.data.layout.drupal_internal__id = "card_left_media"; // set default
    if(this.data.card.field_summary){
      this.data.card.field_summary.value = handleImageInProcessedText(this.data.card.field_summary.value, this.path);
    }
  }
}

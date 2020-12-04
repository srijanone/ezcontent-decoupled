import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "block-title",
  templateUrl: "./block_title.component.html",
})
export class BlockTitleComponent implements OnInit {
  @Input() data: any;
  block_title: any;
  constructor() {}

  ngOnInit() {
    if(this.data.block_layout_settings) {
      if(this.data.block_layout_settings.label_display) {
        this.block_title = this.data.block_layout_settings.label
      }
    }
  }
}

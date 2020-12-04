import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-title",
  templateUrl: "./title-field.component.html",
})
export class TitleComponent implements OnInit {
  @Input() data: any;
  title: any;
  constructor() {}

  ngOnInit() {
    if(this.data.title) {
      this.title = this.data.title
    }
  }
}

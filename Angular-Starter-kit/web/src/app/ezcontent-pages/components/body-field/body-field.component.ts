import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-body",
  templateUrl: "./body-field.component.html"
})
export class BodyComponent implements OnInit {
  @Input() data: any;
  body: any;
  label: any;

  constructor() {}

  ngOnInit() {
    if(this.data.configuration.label_display) {
      this.data = this.data.configuration.label;
    }
    if(this.data.body) {
      this.body = this.data.body.value;
    }
  }
}

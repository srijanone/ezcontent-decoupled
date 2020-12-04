import { Component, OnInit, Input } from "@angular/core";
import { Url } from 'url';

@Component({
  selector: "app-authoredon",
  templateUrl: "./authored-on.component.html"
})
export class AuthoredOnComponent implements OnInit {
  @Input() data: any;
  created: any;

  constructor() {}

  ngOnInit() {
    if(this.data.created) {
      this.created = this.data.created;
    }
  }
}

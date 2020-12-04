import { Component, OnInit, Input } from "@angular/core";
import { Url } from 'url';

@Component({
  selector: "app-authoredby",
  templateUrl: "./authored-by.component.html"
})
export class AuthoredByComponent implements OnInit {
  @Input() data: any;
  author_name: any;
  link: Url;

  constructor() {}

  ngOnInit() {
    if(this.data.uid.links) {
      this.link = this.data.uid.links.self.href
    }

    if(this.data.uid.attributes) {
      this.author_name = this.data.uid.attributes.display_name;
    }
  }
}

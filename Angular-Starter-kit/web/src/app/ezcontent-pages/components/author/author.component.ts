import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "author",
  templateUrl: "./author.component.html",
})
export class AuthorComponent implements OnInit {
  @Input() author: any;

  constructor() {}

  ngOnInit() {}
}

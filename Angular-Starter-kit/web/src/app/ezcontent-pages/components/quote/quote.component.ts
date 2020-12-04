import { Component, OnInit, Input } from "@angular/core";
import * as _ from "lodash";

@Component({
  selector: "app-quote",
  templateUrl: "./quote.component.html",
  styleUrls: ["./quote.component.scss"]
})
export class QuoteComponent implements OnInit {
  @Input() data: any;

  author: any;
  jobTitle: any;
  quote: any;

  constructor() {}

  ngOnInit() {
    this.author = _.get(this.data, "field_source");
    this.jobTitle = _.get(this.data, "field_job_title");
    this.quote = _.get(this.data, "field_quote");
  }
}

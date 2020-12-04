import { Component, OnInit, Input } from "@angular/core";
import handleImageInProcessedText from "../../common/helper";

@Component({
  selector: "app-reference",
  templateUrl: "./reference.component.html",
  styleUrls: ["./reference.component.scss"]
})
export class ReferenceComponent implements OnInit {
  @Input() data: any;
  @Input() path: any;
  referenceData: Array<object>;

  constructor() {}

  ngOnInit() {
    this.referenceData = this.data.map((x: any) => {
      const article = {
        title: x.article.title,
        path: x.article.path.alias,
        summary: x.article.field_summary ? handleImageInProcessedText(x.article.field_summary, this.path) : '',
        button_text: x.article.button_text ? x.article.button_text : 'Read more',
        image: x.file && x.file.uri ? this.path + x.file.uri.url : null,
      };
      return article;
    });

  }
}

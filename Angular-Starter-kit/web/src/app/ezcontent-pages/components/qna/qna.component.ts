import { Component, OnInit, Input } from "@angular/core";
import * as _ from "lodash";
import handleImageInProcessedText from "../../common/helper";

@Component({
  selector: "app-qna",
  templateUrl: "./qna.component.html",
  styleUrls: ["./qna.component.scss"]
})
export class QNAComponent implements OnInit {
  @Input() path: any;
  @Input() data: any;

  question: any;
  answer: any;

  constructor() {}

  ngOnInit() {
    this.question = _.get(this.data, "field_question");
    this.answer = handleImageInProcessedText(_.get(this.data, "field_answer.value"),this.path);
  }
}

import { Component, OnInit, Input } from "@angular/core";
import * as _ from "lodash";
import handleImageInProcessedText from "../../common/helper";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
  styleUrls: ["./faq.component.scss"]
})
export class FaqComponent implements OnInit {
  @Input() path: any;
  @Input() data: any;
  faqData: any;
  unique: any;
  constructor() {}

  ngOnInit() {
    let data = this.data;
    this.unique = this.randomNumber();
    let faq = [];
    faq = data.map(x => {
      const singleFaq = {
        question: x.field_question,
        answer: handleImageInProcessedText(x.field_answer.value, this.path)
      };
      return singleFaq;
    });
    this.faqData = faq;
  }

  randomNumber() {
    return Array(5).fill(null).map(() => Math.random().toString(10).substr(2)).join('');
  }

}

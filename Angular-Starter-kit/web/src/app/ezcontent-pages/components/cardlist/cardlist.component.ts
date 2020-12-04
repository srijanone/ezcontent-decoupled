import { Component, OnInit, Input } from "@angular/core";
import * as _ from "lodash";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-cardlist",
  templateUrl: "./cardlist.component.html",
  styleUrls: ["./cardlist.component.scss"]
})
export class CardListComponent implements OnInit {
  @Input() component: any;
  @Input() path: any;
  listViewMode: any;
  cssClass: any = "card--list-items";
  
  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.listViewMode = 'card';

    if (this.component.view_mode && this.component.view_mode.drupal_internal__id === 'paragraph.cards_grid') {
      this.listViewMode = 'card_grid';
      this.cssClass = "card--list-items text-left paragraph--type--referenced-card";

      // if card grid, lets use reference template/component
      // make a article object as required by template
      for (let key in this.component.items) {
        let x = this.component.items[key];
        this.component.items[key]['article'] = {
          title: x.card.field_title,
          path: { alias: x.card.field_link ? x.card.field_link.url : null},
          field_summary: x.card.field_summary ? x.card.field_summary.value : '',
          button_text: x.card.field_link ? x.card.field_link.title : 'Read more'
        };
      }

    }

  }
}

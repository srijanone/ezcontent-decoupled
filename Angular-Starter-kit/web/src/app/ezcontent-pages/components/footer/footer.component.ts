import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  @Input() footerMenu: any;
  @Input() privacyPolicy: any;
  public current_year = new Date().getFullYear();
  constructor() {}
  ngOnInit() {}
  
}

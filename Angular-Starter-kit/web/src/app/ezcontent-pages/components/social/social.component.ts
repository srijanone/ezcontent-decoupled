import { Component, OnInit, Input } from "@angular/core";
import {DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: "app-social",
  templateUrl: "./social.component.html",
  styleUrls: ["./social.component.scss"]
})
export class Social implements OnInit {
  @Input() data: any;
  url: any;
  type: string;

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.url = this.data.attributes.embed_code;
    this.type = this.data.type;
    if (this.data.type !== "media--tweet") {
      if (this.url.includes("instagram")) {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.url.split("?")[0] + "embed"
        );
      } else
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(
          `${this.data.attributes.embed_code}embed/captioned/`
        );
    }
  }
}

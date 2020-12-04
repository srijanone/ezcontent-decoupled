import { Component, OnInit, Input } from "@angular/core";
import * as _ from "lodash";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-paragraph-asset",
  templateUrl: "./paragraph-asset.component.html",
  styleUrls: ["./paragraph-asset.component.scss"]
})
export class ParagraphAssetComponent implements OnInit {
  @Input() data: any;
  @Input() imageBase: any;
  imageUrl: any;
  videoUrl: SafeResourceUrl;
  isImage: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {}

  getYoutubeVideo(url: any) {
    const p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return url.match(p) ? `https://www.youtube.com/embed/${RegExp.$1}` : "";
  }

  getVimeoVideo(url: any) {
    const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    const parsed = url.match(vimeoRegex);
    return `//player.vimeo.com/video/${parsed[1]}`;
  }

  getVideoFromURL(url: any) {
    if (!url) return "";
    if (url.indexOf("youtu") !== -1) return this.getYoutubeVideo(url);
    if (url.indexOf("vimeo") !== -1) return this.getVimeoVideo(url);
  }

  ngOnInit() {
    if (this.data) {
      if (this.data.imageData.field_media_video_embed_field) {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.getVideoFromURL(this.data.imageData.field_media_video_embed_field)
        );
        this.isImage = false;
      } else {
        if (this.data.file.uri) {
          this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `${this.imageBase}${this.data.file.uri.url}`
          );
          this.isImage = true;
        }
      }
    }
  }
}

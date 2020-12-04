import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  Input,
  Renderer2,
} from "@angular/core";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as _ from "lodash";
import * as $ from 'jquery' 
declare var hbspt: any;
@Component({
  selector: "app-embed",
  templateUrl: "./embed.component.html",
  styleUrls: ["./embed.component.scss"],
})
export class EmbedComponent implements OnInit {
  @Input() data: any;
  finalScript: SafeHtml;
  hubspotForm: SafeHtml;
  dataVal: SafeHtml;
  timestamp: any;
  blockQuote: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private sanitizer: DomSanitizer,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    @Inject(PLATFORM_ID) private platform: any
  ) {}

  loadJScript() {
    if (isPlatformBrowser(this.platform)) {
      let node: any = document.createElement('script');
        node.src = "https://platform.twitter.com/widgets.js";
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  ngOnInit() {
    const { field_script: script } = this.data;
    this.timestamp = Date.now();
      if (_.get(script, "value").includes("hbspt.forms.create")) {
        let x_split = _.get(script, "value").split("hbspt.forms.create(");
        let c_split = x_split[1].replace(");", "").replace("{","").replace("}","");
        let z_value = c_split.split(",");
  
        this.hubspotForm = this.sanitizer.bypassSecurityTrustHtml('hbspt.forms.create({portalId: '+z_value[0].replace("portalId: ","")+',formId: '+z_value[1].replace("formId: ","").replace("</script>","")+',target: "#hubspotFormContent"})');
      }else{
        this.finalScript = this.sanitizer.bypassSecurityTrustHtml(
          _.get(script, "value")
        );
        if (_.get(script, "value").includes("blockquote") && _.get(script, "value").includes("twitter")) {
          this.loadJScript();
          let extractscript = _.get(script, "value").split("</blockquote>");
          this.finalScript = extractscript[0] + "</blockquote>";
        }else{
          if (isPlatformBrowser(this.platform)) {
            this.finalScript = _.get(script, "value");
            var iframe = document.createElement("iframe");
            var html = `<head><style>iframe{ height:100%; width:100%; }</style></head><body>${this.finalScript}</body>`;
            iframe.src = "data:text/html;charset=utf-8," + encodeURI(html);
            iframe.width = "100%";
            iframe.height = "400px";
            iframe.frameBorder = "0";
            document.getElementsByClassName("embedded-container")[document.getElementsByClassName('embedded-container').length-1].appendChild(iframe);
          }
        }
      }
    
    
  }
}
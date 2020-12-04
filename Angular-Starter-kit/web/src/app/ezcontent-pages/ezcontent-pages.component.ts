import { Component, OnInit, Inject,PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta, makeStateKey, TransferState} from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from './../../environments/environment';
import * as _ from "lodash";

@Component({
  selector: 'app-ezcontent-pages',
  templateUrl: './ezcontent-pages.component.html'
})
export class EzcontentPagesComponent implements OnInit {

  title = 'EZContent';
  requestPath: string;
  pageComponents: any;
  menusHeader: any;
  menusFooter: any;
  menusEnd: any;
  cssClass: string = "container";
  login: boolean = false;
  contentAuthor: any;
  showPageTitle: boolean = true;
  pageTitle: string;
  premium_content: boolean = false;
  show_signin: boolean = false;
  PAGE_DATA: any;
  scripts: HTMLScriptElement;
  GaScript: HTMLScriptElement;
  drupalHost: any;
  apiHost: any;
  columnsClass: any;
  errorObj: any;
  public result: any;

  public breadcrumbData: Array<any>;

  constructor(
    @Inject(DOCUMENT) private doc,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private titleService: Title, 
    private metaService: Meta,
    private state: TransferState) {

      this.PAGE_DATA = makeStateKey('PAGE_DATA');

      this.drupalHost = environment.drupalHost;
      this.apiHost = environment.apiHost;
      this.requestPath = this.router.routerState.snapshot.url;
      this.columnsClass = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth'];
  }

  ngOnInit() {
    if(this.requestPath === "/login"){
      this.login = true;
      this.requestPath = "/";
    }
    const pageData: any = this.state.get(this.PAGE_DATA, null);
    if (!pageData) {
      const headers = { 'Content-Type': 'application/json' }
      const body = { 
        "pathAlias": this.requestPath,
        "query": this.activatedRoute.snapshot.queryParams ? this.activatedRoute.snapshot.queryParams : {}
      }
      let userParams = {
        "baseURL": this.drupalHost,
        "request": body,
        "username": environment.username,
        "password": environment.password,
        "clientSecret": environment.clientSecret,
        "clientId": environment.clientId
      }

      this.http.post<any>(this.apiHost + '/api/getcontent', userParams, { headers }).subscribe(response => {
        if(!response) return;
        if(response.message) return;
        this.state.set(this.PAGE_DATA, response as any);
        this.setPageData(response);
      }, (error) => {
        error.errorPage = true;
        this.state.set(this.PAGE_DATA, error as any);
        this.setPageError(error);
      });
    } else {
      // show error page
      if(pageData.errorPage) {
        this.setPageError(pageData);
      } else {
        this.setPageData(pageData);
      }
    }
    
  }

  setPageError(error: any) {
    this.errorObj = {
      code: error.status,
      message: error.statusText
    }
  }


  setPageData(result: any) {
    
    if(result.routerResolve.redirect)
    {
      if (isPlatformBrowser(this.platformId)) {
        window.history.pushState("", "",  _.get(result.routerResolve, "redirect[0].to"));
      }
    }
    if (result.node_basic_data) this.addMeta(result.node_basic_data);

    // add dynamic css
    if (result.layoutCss) this.addCss(result.layoutCss);
    if (result.menus['main']) this.menusHeader = result.menus['main'];
    if (result.menus['footer-menu']) this.menusFooter = result.menus['footer-menu'];
    if (result.menus['privacy-policy']) this.menusEnd = result.menus['privacy-policy'];

    if (result.routerResolve && result.routerResolve.entity.bundle == 'landing_page') {
      this.cssClass = 'col-12';
      this.showPageTitle = false;
      this.showPageTitle = _.get(result.node_basic_data, "path.alias")!=="/home";
    }

    //this.buildPageComponents(response.content);
    
    // premium content
    // check if token is present in local storage
    let token=localStorage.getItem("token")
    
    if(this.premium_content && token === null && this.login === false){
      result.content[0].components = [[result.content[0].components[0][0]]]
      if (result.content) this.pageComponents = [result.content[0]];
      this.show_signin = true;
      localStorage.setItem("premium_url", this.requestPath);
    }else{
      if (result.content) this.pageComponents = result.content;
    }
    
    //if (response.content) this.pageComponents = this.buildPageComponents(response.content);

    if (result.breadcrumb) this.breadcrumbData = result.breadcrumb;

    // get author detail
    if (result.included_fields) this.contentAuthor = this.getAuthor(result);

    // Google analytics
    if (environment.nodeEnv !== 'dev'){
      this.addGoogleAnalytics();
    }

  }

  addMeta(tags: any) {
    if (tags.metatag_normalized) {
      this.pageTitle = tags.title;
      this.titleService.setTitle(`${tags.title} | ${this.title}`);

      let tagsList = [];
      for(let key in tags.metatag_normalized) {
        if(tags.metatag_normalized[key].tag == 'meta') {
          let tagName = tags.metatag_normalized[key].attributes.name;
          let ogProperty = _.get(tags.metatag_normalized[key].attributes, 'property');
          let content = tags.metatag_normalized[key].attributes.content;
          if(!typeof content) {
            content = content.join(",");
          }
          if (tagName != 'author' || tagName != 'publisher' || tagName != 'mainEntityOfPage' || tagName != 'image') {
            tagsList.push({
              name: tagName ?  tagName : '',
              content: content ? content : '',
            });
          }
          if(ogProperty){
            tagsList.push({
              property: ogProperty ?  ogProperty : '',
              content: content ? content : '',
            });
          }
        }
      }
      this.metaService.addTags(tagsList);

      // generate ld json
      let structuredJSON = null;
      let innerSchemaMeta = [];
      let outerSchemaMeta = [];
      outerSchemaMeta["@context"] = "https://schema.org";
      
      let schemaMeta = tags.metatag_normalized.filter(({ attributes }) => attributes.schema_metatag === true);
      if (schemaMeta){
        schemaMeta.map((smTag)=>{
          if(_.get(smTag,"attributes.name")){
            innerSchemaMeta[_.get(smTag,"attributes.name")] = _.get(smTag,"attributes.content");
          }
        });
        if(innerSchemaMeta){
          outerSchemaMeta["@graph"] = [Object.assign({}, innerSchemaMeta)];
        }
      }
      structuredJSON = JSON.stringify(Object.assign({}, outerSchemaMeta))
      if(structuredJSON){
        this.scripts = this.doc.createElement('script');
        this.scripts.setAttribute('type', 'application/ld+json');
        this.scripts.innerHTML = structuredJSON;
        this.doc.head.appendChild(this.scripts);
      }
    }
  }

  addCss(cssUrls: any) {
    if(cssUrls) {
      for(let key in cssUrls) {
        let link: HTMLLinkElement = this.doc.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', cssUrls[key]);
        this.doc.head.appendChild(link);
      }
    }
  }

  getAuthor(result: any) {
    let author  = {};
    if (result.included_fields) {
      let authorId = '';
      for(let key in result.included_fields) {
        if(result.included_fields[key].type === 'node--author') {
          authorId = result.included_fields[key].id;
          break;
        }
      }
      if(authorId){
        let authorObj = _.find(result.included_fields, {'id': authorId});
        author['name'] = _.get(authorObj, "attributes.title");
        author['bio'] = _.get(authorObj, "attributes.body") ? _.get(authorObj, "attributes.body.value") : '';
        if (authorObj.relationships.field_thumbnail.data) {
          let imageObj = _.find(result.included_fields, {'id': authorObj.relationships.field_thumbnail.data.id});
          let image = _.find(result.included_fields, {'id': imageObj.relationships.thumbnail.data.id});
          author['picture'] = this.drupalHost + image.attributes.uri.url;
        }
      }
    }
    return author;
  }

  sortByWeight(arr) {
    const sortArr = arr;
    sortArr.sort((a, b) => {
      if (a[0] && Number.isInteger(a[0].region_num)) {
        return a[0].region_num - b[0].region_num
      }
    })
    return sortArr;
  }

  addGoogleAnalytics(){
    this.GaScript = this.doc.createElement('script');
    this.GaScript.type  = "text/javascript";
    this.GaScript.src   = "https://www.googletagmanager.com/gtag/js?id="+environment.googleAnalytics;    
    this.doc.head.appendChild(this.GaScript);
    this.GaScript = this.doc.createElement('script');
    this.GaScript.type  = "text/javascript";
    this.doc.head.appendChild(this.GaScript);
    let gaFn = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','`+environment.googleAnalytics+`');`;
    this.GaScript.innerHTML = gaFn;
    this.doc.head.appendChild(this.scripts);
  }

}

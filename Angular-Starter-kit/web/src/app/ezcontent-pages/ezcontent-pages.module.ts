import { BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from "@nguniversal/common";
import { ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule} from 'ngx-slick-carousel';



import { EzcontentPagesComponent } from './ezcontent-pages.component';

// Include all the components
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { MapComponent } from "./components/map/map.component";
import { Social } from './components/social/social.component';
import { QuoteComponent } from "./components/quote/quote.component";
import { FaqComponent } from "./components/faq/faq.component";
import { CardComponent } from './components/card/card.component';
import { CardListComponent } from './components/cardlist/cardlist.component';
import { TextComponent } from './components/text/text.component';
import { ParagraphAssetComponent } from './components/paragraph-asset/paragraph-asset.component';
import { EmbedComponent } from './components/embed/embed.component';
import { HeroComponent } from './components/hero/hero.component';
import { ReferenceComponent } from './components/reference/reference.component';
import { QNAComponent } from './components/qna/qna.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GalleryCarouselComponent } from './components/gallery-carousel/gallery-carousel.component';
import { AuthorComponent } from './components/author/author.component';
import { BlockTitleComponent } from './components/block_title/block_title.component';
import { ErrorComponent } from './components/error/error.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AlertComponent } from './components/alert/alert.component';
import { TitleComponent } from './components/title-field/title-field.component';
import { BodyComponent } from './components/body-field/body-field.component';
import { AuthoredByComponent } from './components/authored-by/authored-by.component';
import { AuthoredOnComponent } from './components/authored-on/authored-on.component';
import { LoginComponent } from './components/login/login.component';
import { PremiumComponent } from './components/premium/premium.component';


@NgModule({
  declarations: [
    EzcontentPagesComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    QuoteComponent,
    FaqComponent,
    CardComponent,
    CardListComponent,
    TextComponent,
    Social,
    ParagraphAssetComponent,
    EmbedComponent,
    HeroComponent,
    ReferenceComponent,
    QNAComponent,
    GalleryComponent,
    GalleryCarouselComponent,
    AuthorComponent,
    BlockTitleComponent,
    ErrorComponent,
    BreadcrumbComponent,
    AlertComponent,
    TitleComponent,
    BodyComponent,
    AuthoredByComponent,
    AuthoredOnComponent,
    LoginComponent,
    PremiumComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    SlickCarouselModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [EzcontentPagesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EZContentPagesModule { }

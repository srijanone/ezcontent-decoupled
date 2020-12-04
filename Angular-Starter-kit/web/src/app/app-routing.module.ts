import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EzcontentPagesComponent} from './ezcontent-pages/ezcontent-pages.component';

const routes: Routes = [
    {path: '**', component: EzcontentPagesComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }



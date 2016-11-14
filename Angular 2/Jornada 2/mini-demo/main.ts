import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MaterialModule} from '@angular/material';

@NgModule({

  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
  ],

  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class PlunkerAppModule {}

platformBrowserDynamic().bootstrapModule(PlunkerAppModule);

/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
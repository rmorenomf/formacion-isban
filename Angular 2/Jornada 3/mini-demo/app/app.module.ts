import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PostModule} from '../modules/posts/post.module';
import {PostComponent} from '../modules/posts/post/post.component';

@NgModule({
  imports: [BrowserModule, PostComponent],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
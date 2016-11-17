import {CommondModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {PostComponent} from './post/post.component';

@NgModule({
  imports: [CommondModule], //Se trata de un feaured module.
  exports: [PostComponent],
  declarations: [PostComponent],
  bootstrap: [PostComponent],
  providers: []
})
export class PostModule { }
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from 'app/app.component';

@NgModule({
  imports: [
    BrowserModule,
  ],

  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
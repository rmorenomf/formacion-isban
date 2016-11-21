import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CreditCardModule} from './credit-card/creditcard.module'; 

import {AppComponent} from './app.component';

@NgModule({
  imports: [BrowserModule, CreditCardModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
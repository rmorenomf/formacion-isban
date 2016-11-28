import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from 'app/app.component';

const routes: Routes = [
    { path: 'component-one', component: ComponentOne },
    { path: 'component-two', component: ComponentTwo }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        routing,
    ],
    declarations: [AppComponent],
    providers: [/* TODO: Providers go here */],
    bootstrap: [AppComponent],
})
export class AppModule { }

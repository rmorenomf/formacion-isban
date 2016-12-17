/// <reference path="./node_modules/@angular/core" />

import {Component, Input, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';´
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'default-app',
  template: `
        <b>Angular 2 Using Polymer Webcomponents!</b>

        <hr>
        
        <hr>
        `,
        schemas: [
            CUSTOM_ELEMENTS_SCHEMA
        ],
})
export class AppComponent {
    private data: Observable<Array<number>>;
    private values: Array<number> = [];
    private anyErrors: boolean;
    private finished: boolean;

    constructor() {
    }

    init() {
        /*
        this.data = new Observable(observer => {
                setTimeout(() => {
                    observer.next(42);
                }, 1000);

                setTimeout(() => {
                    observer.next(43);
                }, 2000);

                setTimeout(() => {
                    observer.complete();
                }, 3000);
        });

        let subscription = this.data.subscribe(
                value => this.values.push(value),
                error => this.anyErrors = true,
                () => this.finished = true
        );
        */
    }
}
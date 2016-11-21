import { Component, Input } from '@angular/core';

import { GlobalServiceService } from '../services/service1.service';
import { Module1Service } from '../module1/module1.service';

@Component({
    selector: 'module2-component',
    template: `<h2>{{ label }} - Value: {{ globalValue }} - Value local: {{ localValue }}</h2>
    <button (click)="clickButtonGet()">Get Value Global</button> 
    <button (click)="clickButtonAdd()">Increment Value Global</button>
    <button (click)="clickButtonGetLocal()">Get Value Local</button> 
    <button (click)="clickButtonAddLocal()">Increment Value Local</button>`
})
export class Module2Component {
    
    @Input() label : string; 

    globalValue: number;
    localValue: number;

    gs: GlobalServiceService;
    ms: Module1Service;

    constructor(gs: GlobalServiceService, ms: Module1Service ) {
        this.gs = gs;
        this.ms = ms;

        this.globalValue = gs.getValue();
        this.localValue = ms.getValue();

        console.log( "[*] M2 Call to Global Service: " + gs.getValue() );

        ms.getValue();
    }    

    clickButtonGet(){
        this.globalValue = this.gs.getValue();
        console.log("[*] M2 clickButtonGet OK");
    }

    clickButtonAdd(){
        this.globalValue = this.gs.incrementValue();
        console.log("[*] M2 clickButtonAdd OK");
    }

    clickButtonGetLocal(){
        this.localValue = this.ms.getValue();
        console.log("[*] M2 clickButtonGetLocal OK");
    }

    clickButtonAddLocal(){
        this.localValue = this.ms.incrementValue();
        console.log("[*] M2 clickButtonAddLocal OK");
    }
    
}
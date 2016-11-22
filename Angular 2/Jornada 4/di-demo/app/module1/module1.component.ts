import { Component, Input } from '@angular/core';

import { GlobalServiceService } from '../services/service1.service';
import { Module1Service } from './module1.service';

@Component({
    selector: 'module1-component',
    template: `<h1>{{ label }} - Value: {{ globalValue }} - Value local: {{ localValue }}</h1>
    <img src="{{imgSrc}}" />
    <button (click)="clickButtonGet()">Get Value</button> 
    <button (click)="clickButtonAdd()">Increment Value</button>
    <button (click)="clickButtonGetLocal()">Get Value Local</button> 
    <button (click)="clickButtonAddLocal()">Increment Value Local</button>`,
    providers: [
            GlobalServiceService, 
            Module1Service
    ]
})
export class Module1Component{
    
    @Input() label : string; 

    globalValue: number;
    localValue: number;

    gs: GlobalServiceService;
    ms: Module1Service;

    imgSrc: string;

    constructor(gs: GlobalServiceService, ms: Module1Service ) {
        
        this.imgSrc = "http://cinepremiere.impresionesaerea.netdna-cdn.com/noticias/2015/09-septiembre/bobesponja-musical.jpg";

        this.gs = gs;
        this.ms = ms;

        this.globalValue = gs.getValue();
        this.localValue = ms.getValue();

        console.log( "[*] Call to Global Service: " + gs.getValue() );

        ms.getValue();
    }    

    clickButtonGet(){
        
        this.imgSrc = 'http://v2.static.picapon.com/image_cache/club_avatar/250x250_edec5ff7226c05b91958faffab799bc1.jpg';

        this.globalValue = this.gs.getValue();
        console.log("[*] clickButtonGet OK");
    }

    clickButtonAdd(){
        this.globalValue = this.gs.incrementValue();
        console.log("[*] clickButtonAdd OK");
    }

    clickButtonGetLocal(){
        this.localValue = this.ms.getValue();
        console.log("[*] clickButtonGetLocal OK");
    }

    clickButtonAddLocal(){
        this.localValue = this.ms.incrementValue();
        console.log("[*] clickButtonAddLocal OK");
    }
}
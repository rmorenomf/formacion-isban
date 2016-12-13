import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'app/module1/model1.products';

@Component({
    selector: 'component-dos',
    template: '<b>{{ label.name }}</b>'
})
export class Component2Component implements OnInit {
    
    @Input() label:Product;

    constructor() { }

    ngOnInit() { } 
}
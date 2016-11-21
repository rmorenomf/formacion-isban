import { NgModule } from '@angular/core';

import { Module2Component }   from './module2.component';
import { Module1Module } from '../module1/module1.module'; 
import { GlobalServiceService } from '../services/service1.service'; 

import { Module1Service } from '../module1/module1.service';

@NgModule({
    imports: [Module1Module],
    exports: [Module2Component],
    declarations: [Module2Component],
    providers: [GlobalServiceService, Module1Service],
})
export class Module2Module { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Module1Component }  from './module1.component';
import { Module1Service }  from './module1.service';
import { GlobalServiceService } from '../services/service1.service'; 

@NgModule({
    imports: [CommonModule],
    exports: [Module1Component],
    declarations: [Module1Component]
})
export class Module1Module { }
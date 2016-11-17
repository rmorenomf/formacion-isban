import { NgModule }     from '@angular/core';
import { Routes,
         RouterModule } from '@angular/router';

import { HeroComponent }       from './hero.component.3';
import { HeroListComponent }   from './hero-list.component';
import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
  { path: '',
    component: HeroComponent,
    children: [
      { path: '',    component: HeroListComponent },
      { path: ':id', component: HeroDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
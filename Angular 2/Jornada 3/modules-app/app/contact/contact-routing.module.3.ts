import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';

import { ContactComponent }    from './contact.component.3';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'contact', component: ContactComponent}
  ])],
  exports: [RouterModule]
})
export class ContactRoutingModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
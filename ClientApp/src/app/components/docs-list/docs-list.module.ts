import { DocFormModule } from './../doc-form/doc-form.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialComponentsModule } from './../../shared/material-components.module';
import { DocsListComponent } from './docs-list.component';



@NgModule({
  declarations: [
    DocsListComponent
  ],
  imports: [
    CommonModule,
    DocFormModule,
    MaterialComponentsModule
  ]
})
export class DocsListModule { }

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialComponentsModule } from './../../shared/material-components.module';
import { DocFormComponent } from './doc-form.component';


@NgModule({
  declarations: [
    DocFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialComponentsModule
  ]
})
export class DocFormModule { }

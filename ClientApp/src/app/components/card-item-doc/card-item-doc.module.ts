import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialComponentsModule } from './../../shared/material-components.module';
import { CardItemDocComponent } from './card-item-doc.component';



@NgModule({
  declarations: [
    CardItemDocComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  exports:[CardItemDocComponent]
})
export class CardItemDocModule { }

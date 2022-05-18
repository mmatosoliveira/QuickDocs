import { CardItemDocModule } from './../card-item-doc/card-item-doc.module';
import { MaterialComponentsModule } from './../../shared/material-components.module';
import { SidenavComponent } from './sidenav.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    CardItemDocModule
  ],
  exports:[SidenavComponent]
})
export class SidenavModule { }

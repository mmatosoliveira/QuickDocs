import { SidenavModule } from './../sidenav/sidenav.module';
import { ToolbarModule } from './../toolbar/toolbar.module';
import { MaterialComponentsModule } from './../../shared/material-components.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ToolbarModule,
    SidenavModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }

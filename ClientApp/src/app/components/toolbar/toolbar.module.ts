import { MaterialComponentsModule } from './../../shared/material-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { DocsListModule } from '../docs-list/docs-list.module';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    DocsListModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }

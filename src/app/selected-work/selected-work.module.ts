import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedWorkComponent } from './selected-work.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    SelectedWorkComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class SelectedWorkModule { }

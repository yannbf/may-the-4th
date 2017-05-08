import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TimerComponent } from './timer';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

@NgModule({
  declarations: [
    TimerComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    TimerComponent
  ]
})
export class TimerComponentModule {}

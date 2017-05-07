import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountdownTimerComponent } from './countdown-timer';

@NgModule({
  declarations: [
    CountdownTimerComponent,
  ],
  imports: [
    IonicPageModule.forChild(CountdownTimerComponent),
  ],
  exports: [
    CountdownTimerComponent
  ]
})
export class CountdownTimerComponentModule {}

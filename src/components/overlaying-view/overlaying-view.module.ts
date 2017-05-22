import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OverlayingViewComponent } from './overlaying-view';

@NgModule({
  declarations: [
    OverlayingViewComponent,
  ],
  imports: [
    IonicPageModule.forChild(OverlayingViewComponent),
  ],
  exports: [
    OverlayingViewComponent
  ]
})
export class OverlayingViewComponentModule {}

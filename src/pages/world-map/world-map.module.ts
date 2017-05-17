import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorldMapPage } from './world-map';

@NgModule({
  declarations: [
    WorldMapPage,
  ],
  imports: [
    IonicPageModule.forChild(WorldMapPage),
  ],
  exports: [
    WorldMapPage
  ]
})
export class WorldMapPageModule {}

import { SwapiProvider } from '../../providers/swapi/swapi';
import { AudioService } from '../../providers/audio-service/audio-service';
import { AppState } from '../../app/app.global';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public global: AppState,
    public audioCtrl: AudioService, public swapi: SwapiProvider) {
      this.loadData();
  }

  loadData() {
    // Test method
    this.swapi.getPerson(1).subscribe(data => {
      console.log(data);
    });
  }

  changeTheme(side){
    this.global.set('side', side);
    this.audioCtrl.play('turnLightSaberOn');
  }

}

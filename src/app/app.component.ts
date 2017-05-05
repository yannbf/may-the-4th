import { AudioService } from '../providers/audio-service/audio-service';
import { AppState } from './app.global';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Shake } from '@ionic-native/shake';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'MenuPage';

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public global: AppState,
    private shake: Shake, private audioCtrl: AudioService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.global.set('side', 'light');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('cordova')){
        this.watchForSwings();
      }
    });
  }

  watchForSwings() {
    const watch = this.shake.startWatch(18).subscribe(() => {
      this.audioCtrl.swingLightSaber();
    });
  }
}

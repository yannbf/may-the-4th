import { AppState } from './app.global';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Shake } from '@ionic-native/shake';

import { Subject } from 'rxjs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'MenuPage';



  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public global: AppState,
    private shake: Shake) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.global.set('side', 'light');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.watchForSwings();
    });
  }

  watchForSwings() {
    const watch = this.shake.startWatch(60).subscribe(() => {
      this.swingLightSaber();
    });
  }

  swingLightSaber() {
    // Play audio here
  }
}

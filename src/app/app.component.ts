import { MenuShiftType } from '../pages/menu/shift-transition';
import { Device } from '@ionic-native/device';
import { AudioService } from '../providers/audio-service/audio-service';
import { AppState } from './app.global';
import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Shake } from '@ionic-native/shake';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'MenuPage';

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public global: AppState,
    private shake: Shake, private audioCtrl: AudioService,
    private device: Device) {
    this.initializeApp();
    this.initializeFirebase();
  }

  initializeFirebase() {
    let config = {
      apiKey: "AIzaSyAK2DSpw4LHsYS6tPzgfHmZnVM32uQaQn4",
      authDomain: "star-warnic.firebaseapp.com",
      databaseURL: "https://star-warnic.firebaseio.com",
      projectId: "star-warnic",
      storageBucket: "star-warnic.appspot.com",
      messagingSenderId: "459136741480"
    };
    firebase.initializeApp(config);
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.global.set('uuid', this.device.uuid);
      this.global.set('side', 'light');

      MenuController.registerType('shift', MenuShiftType);

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

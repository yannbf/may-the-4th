import { MenuShiftType } from '../pages/menu/shift-transition';
import { AppState } from './app.global';
import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import Fingerprint2 from 'fingerprintjs2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'MenuPage';

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public global: AppState,
    public storage: Storage) {
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
      this.storage.get('uuid').then(uuid => {
        if(uuid){
          this.global.set('uuid', uuid);
        } else {
          new Fingerprint2().get((result, components) => {
            this.global.set('uuid', result);
            this.storage.set('uuid', result);
          });
        }
      });
      this.global.set('side', 'light');

      MenuController.registerType('shift', MenuShiftType);

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

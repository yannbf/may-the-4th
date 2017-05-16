import { MotionProvider } from '../../providers/motion/motion';
import { AlertService } from '../../providers/alert/alert';
import { Device } from '@ionic-native/device';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AudioService } from '../../providers/audio-service/audio-service';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppState } from '../../app/app.global';
import { IonicPage, Menu, Nav, NavController } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';
import { Flashlight } from '@ionic-native/flashlight';
import { Storage } from '@ionic/storage';

import { Subject } from 'rxjs';

@IonicPage({
  segment: 'menu'
})
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {
  @ViewChild('content') content: Nav;
  @ViewChild(Menu) menu: Menu;

  rootPage: any = 'HomePage';
  activePage    = new Subject();

  splash        = false;
  fade          = false;
  jediMode      = false;
  side          = 'light';

  pages: Array<{ title: string, component: any, active: boolean, icon: string }>;

  public menuRoot = 'HomePage';
  constructor(public nav: NavController,
    public global: AppState,
    public splashScreen: SplashScreen,
    public audioCtrl: AudioService,
    public flashlight: Flashlight,
    public firebaseData: FirebaseDataProvider,
    public device: Device,
    public alertCtrl: AlertService,
    public storage: Storage,
    public motionCtrl: MotionProvider) {
    this.initialize();
  }

  initialize() {
    this.initPages();
    // this.getUserInfo();
    // this.motionCtrl.startWatchingSwings();
    setTimeout(() => this.fade = true, 7000);
    setTimeout(() => this.splash = false, 7800);
  }

  initPages() {
    this.pages = [
      { title: 'Home', component: 'HomePage', active: true, icon: 'sw-logo' },
    ];

    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.content.setRoot(page.component);
    this.activePage.next(page);
  }

  isFirstAccess(){
    return this.storage.get('firstAccess').then((data) => {
      if(!data){
        this.storage.set('firstAccess', false);
        return false;
      } else {
        return true;
      }
    });
  }

  getUserInfo(){
    this.isFirstAccess().then(isFirst => {
      if(!isFirst) {
        this.alertCtrl.getUserName().then( name => {
          this.alertCtrl.getUserSide().then( side => {
            let user = {
              name: name,
              side: side,
              uuid: this.device.uuid,
            }
            this.firebaseData.writeUserData(user);

            this.side = side;
            this.setSide(this.side);
          });
        });
      }
    });
  }

  switchSides(){
    if(this.side === 'dark'){
      this.side = 'light';
    } else {
      this.side = 'dark';
    }
    this.setSide(this.side);
  }

  setSide(side){
    this.global.set('side', side);
    this.firebaseData.setSide(side);
    this.audioCtrl.play('turnLightSaberOn');
  }

  toggleJediMode(){
    if(this.jediMode){
      this.flashlight.switchOn();
      this.audioCtrl.play('turnLightSaberOn');
      this.motionCtrl.startWatchingSwings();
    } else {
      this.flashlight.switchOff();
      this.motionCtrl.stopWatchingSwings();
    }
  }

}
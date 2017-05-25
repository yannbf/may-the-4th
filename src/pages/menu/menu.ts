import { MotionProvider } from '../../providers/motion/motion';
import { AlertService } from '../../providers/alert/alert';
import { Device } from '@ionic-native/device';
import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { AudioService } from '../../providers/audio-service/audio-service';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { AppState } from '../../app/app.global';
import { IonicPage, Menu, Nav, NavController, Platform } from 'ionic-angular';
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
  onMobile      = false;

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
    public geolocation: Geolocation,
    public motionCtrl: MotionProvider,
    public platform: Platform) {
    this.initialize();
  }

  initialize() {
    this.initPages();
    this.onMobile =  navigator.userAgent.includes('Android') || navigator.userAgent.includes('iPhone');

    this.storage.get('splashInfo').then(data => {
      if(data) {
        var now = new Date();
        var difference = now.getTime() - data.getTime();
        var minutesDifference = Math.round(difference / 60000);

        if(minutesDifference >= 3) {
          this.showSplash();
        }
      } else {
        this.showSplash();
      }
    });
  }

  showSplash() {
    this.splash = true;
    setTimeout(() => this.fade = true, 7000);
    setTimeout(() => this.splash = false, 7800);
    this.storage.set('splashInfo', new Date());
  }

  initPages() {
    this.pages = [
      { title: 'Movies', component: 'HomePage', active: true, icon: 'sw-logo' },
      { title: 'Force map', component: 'WorldMapPage', active: false, icon: 'sw-death-star' },
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
      if (this.platform.is('cordova')) this.flashlight.switchOn();
      this.audioCtrl.play('turnLightSaberOn');
      this.motionCtrl.startWatchingSwings();
    } else {
      if (this.platform.is('cordova')) this.flashlight.switchOff();
      this.motionCtrl.stopWatchingSwings();
    }
  }

}
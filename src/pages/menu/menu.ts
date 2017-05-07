import { AudioService } from '../../providers/audio-service/audio-service';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppState } from '../../app/app.global';
import { IonicPage, Menu, NavController, Nav } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

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
  activePage = new Subject();
  splash = false;
  fade   = false;
  side   = 'light';

  pages: Array<{ title: string, component: any, active: boolean, icon: string }> = [
      { title: 'Home', component: 'HomePage', active: true, icon: 'home' },
      { title: 'List Page', component: 'ListPage', active: false, icon: 'alarm' },
    ];

  public menuRoot = 'HomePage';
  constructor(public nav: NavController, public global: AppState,
    public splashScreen: SplashScreen, public audioCtrl: AudioService) {
    this.initialize();
  }

  initialize() {
    this.pages = [
      { title: 'Home', component: 'HomePage', active: true, icon: 'home' },
    ];

    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });

    setTimeout(() => this.fade = true, 7000);
    setTimeout(() => this.splash = false, 7800);
    // this.splashScreen.hide();
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
    this.global.set('side', this.side);
    this.audioCtrl.play('turnLightSaberOn');
  }
}
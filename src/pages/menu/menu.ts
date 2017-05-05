import { AppState } from '../../app/app.global';
import { IonicPage, Menu, NavController, Nav, Events } from 'ionic-angular';
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

  pages: Array<{ title: string, component: any, active: boolean, icon: string }> = [
      { title: 'Home', component: 'HomePage', active: true, icon: 'home' },
      { title: 'List Page', component: 'ListPage', active: false, icon: 'alarm' },
    ];

  public menuRoot = 'HomePage';
  constructor(public nav: NavController, public global: AppState) {
    this.initialize();
  }

  initialize() {
    this.pages = [
      { title: 'Home', component: 'HomePage', active: true, icon: 'home' },
      { title: 'List Page', component: 'ListPage', active: false, icon: 'alarm' },
    ];

    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });
    console.log(this.pages);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.content.setRoot(page.component);
    this.activePage.next(page);
  }
}
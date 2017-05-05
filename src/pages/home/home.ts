import { AppState } from '../../app/app.global';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public global: AppState) {

  }

  changeTheme(){
    this.global.set('side', 'dark');
  }

}

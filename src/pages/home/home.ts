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

  films = [];

  constructor(public navCtrl: NavController, public global: AppState,
    public audioCtrl: AudioService, public swapi: SwapiProvider) {
      this.loadData();
  }

  loadData() {
    this.swapi.getFilms().subscribe(data => {
      this.films = data.results;
    });
  }

  changeTheme(side){
    this.global.set('side', side);
    this.audioCtrl.play('turnLightSaberOn');
  }

  viewFilmDetail(film) {
    this.navCtrl.push('FilmDetailPage', film);
  }

  getCover(id){
    return `url(assets/img/scenes/episode_${id}.jpg)`;
  }

}

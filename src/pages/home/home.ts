import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { SwapiProvider } from '../../providers/swapi/swapi';
import { AudioService } from '../../providers/audio-service/audio-service';
import { AppState } from '../../app/app.global';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  films = [];
  last = {
    episode_id: 8,
    title: 'The last Jedi'
  }

  constructor(public navCtrl: NavController, public global: AppState,
    public audioCtrl: AudioService, public swapi: SwapiProvider,
    public firebaseData: FirebaseDataProvider, private device: Device) {
      this.loadData();

      let user = {
        uuid: this.device.uuid,
        name: 'Yann',
        side: 'light'
      };

      this.firebaseData.writeUserData(user)
        .then(data => {
          console.log('deu certo', user);
        })
        .catch(error => {
          console.log('error!', error);
        });
  }

  loadData() {
    this.swapi.getFilms().subscribe(data => {
      this.films = data.results;
      this.films.push(this.last);
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

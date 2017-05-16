import { SwapiProvider } from '../../providers/swapi/swapi';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController,
    public swapi: SwapiProvider,) {
      this.loadData();
    }

  loadData() {
    this.swapi.getFilms().subscribe(data => {
      this.films = data.results;
      this.films.push(this.last);
    });
  }

  viewFilmDetail(film) {
    this.navCtrl.push('FilmDetailPage', film);
  }

  getCover(id){
    return `url(assets/img/scenes/episode_${id}.jpg)`;
  }

}

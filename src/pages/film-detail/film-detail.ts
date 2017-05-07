import { AVATARS } from './avatars';
import { AppState } from '../../app/app.global';
import { RomanizePipe } from '../../pipes/romanize/romanize';
import { OmdbProvider } from '../../providers/omdb/omdb';
import { SwapiProvider } from '../../providers/swapi/swapi';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-film-detail',
  templateUrl: 'film-detail.html',
})
export class FilmDetailPage {

  film       : any;
  movieTitle : string;
  image      : any;
  omdbData   : any = {};
  characters = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public swapi: SwapiProvider, public omdb: OmdbProvider,
    public global: AppState, public iab: InAppBrowser) {
    this.film = navParams.data;
    if(this.film){
      this.image = 'assets/img/covers/episode_' + this.film.episode_id + '.png';
      this.movieTitle = 'Episode ' + new RomanizePipe().transform(this.film.episode_id);

      this.loadCharacters();
      this.loadOmdbData();
    }
  }

  loadOmdbData() {
    if(this.film.episode_id != 7){
      let query = 'Star wars: ' + this.movieTitle;
      this.omdb.searchMovieInfo(query).subscribe(data => {
        this.omdbData = data;
      });
    } else {
      this.exceptionalInfo();
    }
  }

  loadCharacters() {
    if(this.film){
      for(let i in this.film.characters) {
        let character = this.film.characters[i];
        this.swapi.get(character).subscribe(characterData => {
          characterData.photo = this.getAvatar(characterData);
          this.characters.push(characterData);
        });
      }
    }
  }

  openIMDB() {
    let url = 'https://www.imdb.com/title/' + this.omdbData.imdbID;
    const browser = this.iab.create(url);
    browser.show();
  }

  getAvatar(character) {
    let index = character.url.split('/')[5];
    index = parseInt(index) - 1;
    console.log(AVATARS[index]);

    return AVATARS[index] ? AVATARS[index].photo : '';
  }

  exceptionalInfo() {
    this.omdbData = {
      Plot: '30 years after the defeat of Darth Vader and the Empire, Rey, a scavenger from the planet Jakku, finds a BB-8 droid that knows the whereabouts of the long lost Luke Skywalker. Rey, as well as a rogue stormtrooper and two smugglers, are thrown into the middle of a battle between the Resistance and the daunting legions of the First Order.',
      Runtime: '136 min',
      Awards: 'Nominated for 5 Oscars. Another 51 wins & 115 nominations',
      imdbRating: '8,1'
    }
  }
}

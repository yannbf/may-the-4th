import { AVATARS } from './avatars';
import { AppState } from '../../app/app.global';
import { RomanizePipe } from '../../pipes/romanize/romanize';
import { OmdbProvider } from '../../providers/omdb/omdb';
import { SwapiProvider } from '../../providers/swapi/swapi';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

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
  trailers = [
    {
      name: 'Episode I: The Phantom Menace',
      id: 'bD7bpG-zDJQ',
    },{
      name: 'Episode II: Attack of the Clones',
      id: 'CO2OLQ2kiq8'
    },{
      name: 'Episode III: Revenge of the Sith ',
      id: '5UnjrG_N8hU',
    },{
      name: 'Episode IV: A New Hope',
      id: 'vZ734NWnAHA',
    },{
      name: 'Episode V: The Empire Strikes Back',
      id: 'JNwNXF9Y6kY',
    },{
      name: 'Episode VI - Return Of The Jedi',
      id: 'CsDwpF3uiZI',
    },{
      name: 'Episode VII - The Force Awakens',
      id: 'sGbxmsDFVnE',
    }, {
      name: 'Episode VIII - The Last Jedi',
      id: 'zB4I68XVPzQ'
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public swapi: SwapiProvider, public omdb: OmdbProvider,
    public global: AppState, public iab: InAppBrowser,
    private youtube: YoutubeVideoPlayer, public loadingCtrl: LoadingController,
    private platform: Platform) {
    this.film = navParams.data;
    if(this.film){
      this.image = `assets/img/covers/episode_${this.film.episode_id}.jpg`;
      this.movieTitle = 'Episode ' + new RomanizePipe().transform(this.film.episode_id);

      this.loadCharacters();
      this.loadOmdbData();
    }
  }

  loadOmdbData() {
    if(this.film.episode_id != 7){
      let query = 'Star wars: ' + this.movieTitle;
      let loading = this.loadingCtrl.create({
        content: 'Loading...'
      });
      loading.present();
      this.omdb.searchMovieInfo(query).subscribe(data => {
        this.omdbData = data;
        loading.dismiss();
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
    this.openOnBrowser(url);
  }

  openOnBrowser(url){
    let browser = this.iab.create(url);
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

  openTrailer () {
    let id = this.trailers[this.film.episode_id-1].id;

    if(this.platform.is('cordova')){
      this.youtube.openVideo(id);
    } else {
      let url = `https://www.youtube.com/watch?v=${id}`;
      this.openOnBrowser(url);
    }
  }
}

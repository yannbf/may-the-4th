import { RomanizePipe } from '../../pipes/romanize/romanize';
import { SwapiProvider } from '../../providers/swapi/swapi';
import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, Content, LoadingController, NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { MovieInfoProvider } from '../../providers/movie-info/movie-info';
import { AVATARS } from './avatars';

@IonicPage()
@Component({
  selector: 'page-film-detail',
  templateUrl: 'film-detail.html',
})
export class FilmDetailPage {

  film       : any;
  movieTitle : string;
  image      : any;
  filmData   : any = {};
  characters = [];
  triviaData = [];
  @ViewChild('view') view;
  @ViewChild(Content) content: Content;

  movieData  = [
    {
      imdb: 'tt0120915',
      name: 'Episode I: The Phantom Menace',
      id: 'bD7bpG-zDJQ',
    },{
      imdb: 'tt0121765',
      name: 'Episode II: Attack of the Clones',
      id: 'CO2OLQ2kiq8'
    },{
      imdb: 'tt0121766',
      name: 'Episode III: Revenge of the Sith ',
      id: '5UnjrG_N8hU',
    },{
      imdb: 'tt0076759',
      name: 'Episode IV: A New Hope',
      id: 'vZ734NWnAHA',
    },{
      imdb: 'tt0080684',
      name: 'Episode V: The Empire Strikes Back',
      id: 'JNwNXF9Y6kY',
    },{
      imdb: 'tt0086190',
      name: 'Episode VI - Return Of The Jedi',
      id: 'CsDwpF3uiZI',
    },{
      imdb: 'tt2488496',
      name: 'Episode VII - The Force Awakens',
      id: 'sGbxmsDFVnE',
    }, {
      imdb: 'tt2527336',
      name: 'Episode VIII - The Last Jedi',
      id: 'zB4I68XVPzQ'
    }
  ]

   viewOptions = {
        title: 'Trivia',
        handleHeight: 50,
        thresholdFromBottom: 200,
        thresholdFromTop: 200,
        bounceBack: true
    };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public swapi: SwapiProvider,
    public movieInfo: MovieInfoProvider,
    public iab: InAppBrowser,
    private youtube: YoutubeVideoPlayer,
    public loadingCtrl: LoadingController,
    public renderer: Renderer,
    private platform: Platform) {
    this.film = navParams.data;
  }

  onScrollEnd($event){
    if( $event.scrollTop + this.platform.height() >= $event.scrollHeight) {
      this.renderer.setElementStyle(this.view.element.nativeElement, 'transform', 'translateY(0)');
    }
    // console.log('test',$event, this.platform.height())
  }

  ngAfterViewInit() {
    if(this.film){
      this.image = `assets/img/covers/episode_${this.film.episode_id}.jpg`;
      this.movieTitle = 'Episode ' + new RomanizePipe().transform(this.film.episode_id);

      this.loadCharacters();
      this.loadFilmData();
    }
  }

  loadFilmData() {
    if(this.film.episode_id != 8){
      let id = this.movieData[this.film.episode_id-1].imdb;
      let loading = this.loadingCtrl.create({
        content: 'Loading...'
      });
      loading.present();
      this.movieInfo.getMovieInfo(id).subscribe(data => {
        this.filmData = data;
        loading.dismiss();
      });
      this.movieInfo.getTrivia(id).subscribe(data => {
        this.triviaData = data;
      });
    }
  }

  loadCharacters() {
    if(this.film){
      for(let i in this.film.characters) {
        let character = this.film.characters[i].split('/')[5];
        this.swapi.getPerson(character).subscribe(characterData => {
          characterData.photo = this.getAvatar(characterData);
          this.characters.push(characterData);
        });
      }
    }
  }

  openIMDB() {
    let id = this.movieData[this.film.episode_id-1].imdb;
    let url = 'https://www.imdb.com/title/' + id;
    this.openOnBrowser(url);
  }

  openOnBrowser(url){
    let browser = this.iab.create(url);
    browser.show();
  }

  getAvatar(character) {
    let index = character.url.split('/')[5];
    index = parseInt(index) - 1;
    return AVATARS[index] ? AVATARS[index].photo : '';
  }

  openTrailer () {
    let id = this.movieData[this.film.episode_id-1].id;

    // if(this.platform.is('cordova')){
      // this.youtube.openVideo(id);
    // } else {
      let url = `https://www.youtube.com/watch?v=${id}`;
      this.openOnBrowser(url);
    // }
  }
}

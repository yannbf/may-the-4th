import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

// Provides a way to work with audio on native
// or fall back to html5 when on browser.
@Injectable()
export class AudioService {

  preloadedAudios: Map<string, string>;
  lightSaberSwings = ['lightSwing', 'lightSwing2', 'heavySwing', 'heavySwing2'];

  constructor(private nativeAudio: NativeAudio,
    private platform: Platform) {

    this.platform.ready().then( () => {
      this.preloadDefaultAudios();
    });
  }

  preloadDefaultAudios() {
    this.preloadedAudios = new Map();
    this.preload('turnLightSaberOn', 'assets/audio/lightsaber-on.mp3');
    this.preload('lightSwing'      , 'assets/audio/light_swing.mp3');
    this.preload('lightSwing2'     , 'assets/audio/light_swing_2.mp3');
    this.preload('heavySwing'      , 'assets/audio/heavy_swing.mp3');
    this.preload('heavySwing2'     , 'assets/audio/heavy_swing_2.mp3');
    this.preload('jediOn'          , 'assets/audio/jedi_on.mp3');
    this.preload('jediOff'         , 'assets/audio/jedi_off.mp3');
  }

  preload(key, path) {
    if (this.platform.is('cordova')) {
      this.nativeAudio.preloadSimple(key, path);
    } else {
      this.preloadedAudios.set(key, path);
    }
  }

  play(key) {
    if (this.platform.is('cordova')) {
      this.nativeAudio.play(key);
    } else {
      let audioPath = this.preloadedAudios.get(key);
      let audio = new Audio(audioPath);
      audio.load();
      audio.play();
    }
  }

  playIntro() {
    let path = 'assets/audio/intro.mp3';
    if(this.platform.is('cordova')){
      this.nativeAudio.preloadSimple('intro' , path).then(()=>{
        this.nativeAudio.play('intro');
      }).catch(error => {
        alert(JSON.stringify(error));
      });
    } else {
      let audio = new Audio(path);
      audio.load();
      audio.play();
    }
  }

  swingLightSaber() {
    let index = Math.floor(Math.random() * 4);
    let swing = this.lightSaberSwings[index];
    this.play(swing);
  }
}

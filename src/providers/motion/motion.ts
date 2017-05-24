import { Shake } from '@ionic-native/shake';
import { Platform } from 'ionic-angular';
import { AudioService } from '../audio-service/audio-service';
import { Injectable } from '@angular/core';

@Injectable()
export class MotionProvider {
  axisMovement: number = 0;
  watchEvent: any;

  constructor(public audioCtrl: AudioService,
    public platform: Platform,
    public shake: Shake) {
  }

  startWatchingSwings() {
    if(this.platform.is('cordova')) {
      this.watchEvent = this.shake.startWatch(10).subscribe(() => {
        this.audioCtrl.swingLightSaber();
      });
    } else {
      window.ondevicemotion = (event) => {
        setImmediate(() => {
        	var accelerationX = Math.abs(event.accelerationIncludingGravity.x);
          let swing         = Math.abs(this.axisMovement - accelerationX);

          if(swing >= 12){
            alert(swing);
            this.audioCtrl.swingLightSaber();
            this.axisMovement = accelerationX;
          } else {
            this.axisMovement = accelerationX;
          }
        });
      }
    }
  }

  stopWatchingSwings() {
    if(this.platform.is('cordova')) {
      if(this.watchEvent) {
        this.watchEvent.unsubscribe();
      }
    } else {
      window.ondevicemotion = null;
    }
  }
}

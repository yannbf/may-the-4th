import { Shake } from '@ionic-native/shake';
import { Platform } from 'ionic-angular';
import { AudioService } from '../audio-service/audio-service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MotionProvider {
  axisMovement: number = 0;
  watchEvent: any;
  movementSubject = new Subject();

  constructor(public audioCtrl: AudioService,
    public platform: Platform,
    public shake: Shake) {
  }

  startWatchingSwings() {
    if(this.platform.is('cordova')) {
      this.watchEvent = this.shake.startWatch(10).subscribe(() => {
        this.movementSubject.next(true);
      });
    } else {
      window.ondevicemotion = (event) => {
        var accelerationX = Math.abs(event.accelerationIncludingGravity.x);
        let swing         = Math.abs(this.axisMovement - accelerationX);

        if(swing >= 10){
          this.movementSubject.next(true);
          this.axisMovement = accelerationX;
        } else {
          this.axisMovement = accelerationX;
        }
      }
    }

    return this.movementSubject;
  }

  stopWatchingSwings() {

    this.movementSubject.complete();

    if(this.platform.is('cordova')) {
      if(this.watchEvent) {
        this.watchEvent.unsubscribe();
      }
    } else {
      window.ondevicemotion = null;
    }
  }
}

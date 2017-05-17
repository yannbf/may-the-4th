import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

declare var Connection;

@Injectable()
export class ConnectivityProvider {

  onDevice: boolean;

  constructor(public platform: Platform, public network: Network){
    this.onDevice = this.platform.is('cordova');
  }

  isOnline(): boolean {
    return navigator.onLine;
    // if(this.onDevice && this.network.connection){
    //   return this.network.connection !== Connection.NONE;
    // } else {
    //   return navigator.onLine;
    // }
  }

  isOffline(): boolean {
    return !navigator.onLine;
    // if(this.onDevice && this.network.connection){
    //   return this.network.connection === Connection.NONE;
    // } else {
    //   return !navigator.onLine;
    // }
  }

  watchOnline(): Observable<any> {
    return this.network.onConnect();
  }

  watchOffline(): Observable<any> {
    return this.network.onDisconnect();
  }

}
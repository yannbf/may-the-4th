import { AppState } from './app.global';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

// Ionic native providers
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Shake } from '@ionic-native/shake';
import { NativeAudio } from '@ionic-native/native-audio';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { Device } from '@ionic-native/device';
import { Geolocation } from '@ionic-native/geolocation';
import { Flashlight } from '@ionic-native/flashlight';
import { IonicStorageModule } from '@ionic/storage';

// Custom providers
import { AudioService } from '../providers/audio-service/audio-service';
import { SwapiProvider } from '../providers/swapi/swapi';
import { OmdbProvider } from '../providers/omdb/omdb';
import { GoogleImagesProvider } from '../providers/google-images/google-images';
import { FirebaseDataProvider } from '../providers/firebase-data/firebase-data';
import { MotionProvider } from '../providers/motion/motion';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { GoogleMapsClusterProvider } from '../providers/google-maps-cluster/google-maps-cluster';
import { AlertService } from '../providers/alert/alert';
import { CacheModule } from "ionic-cache";
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CacheModule.forRoot(),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    AppState,
    StatusBar,
    SplashScreen,
    Shake,
    NativeAudio,
    GoogleImagesProvider,
    InAppBrowser,
    YoutubeVideoPlayer,
    FirebaseDataProvider,
    Device,
    Flashlight,
    Geolocation,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    AudioService,
    SwapiProvider,
    OmdbProvider,
    AlertService,
    MotionProvider,
    GoogleMapsProvider,
    ConnectivityProvider,
    GoogleMapsClusterProvider,
  ]
})
export class AppModule {}

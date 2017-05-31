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
import { Geolocation } from '@ionic-native/geolocation';
import { Flashlight } from '@ionic-native/flashlight';
import { IonicStorageModule } from '@ionic/storage';

// Custom providers
import { AudioService } from '../providers/audio-service/audio-service';
import { SwapiProvider } from '../providers/swapi/swapi';
import { GoogleImagesProvider } from '../providers/google-images/google-images';
import { FirebaseDataProvider } from '../providers/firebase-data/firebase-data';
import { MotionProvider } from '../providers/motion/motion';
import { ConnectivityProvider } from '../providers/connectivity/connectivity';
import { AlertService } from '../providers/alert/alert';
import { CacheModule } from "ionic-cache";
import { Network } from '@ionic-native/network';
import { MovieInfoProvider } from '../providers/movie-info/movie-info';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAK2DSpw4LHsYS6tPzgfHmZnVM32uQaQn4",
  authDomain: "star-warnic.firebaseapp.com",
  databaseURL: "https://star-warnic.firebaseio.com",
  projectId: "star-warnic",
  storageBucket: "star-warnic.appspot.com",
  messagingSenderId: "459136741480"
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true
    }),
    CacheModule.forRoot(),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
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
    Flashlight,
    Geolocation,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    AudioService,
    SwapiProvider,
    AlertService,
    MotionProvider,
    ConnectivityProvider,
    MovieInfoProvider,
  ]
})
export class AppModule {}

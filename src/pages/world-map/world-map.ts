import { FirebaseDataProvider } from '../../providers/firebase-data/firebase-data';
import { GoogleMapsClusterProvider } from '../../providers/google-maps-cluster/google-maps-cluster';
import { GoogleMapsProvider } from '../../providers/google-maps/google-maps';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, MenuController, NavParams, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-world-map',
  templateUrl: 'world-map.html',
})
export class WorldMapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navParams: NavParams,
    public platform: Platform,
    public maps: GoogleMapsProvider,
    public mapsCluster: GoogleMapsClusterProvider,
    public menu: MenuController,
    public firebaseData: FirebaseDataProvider) {
      menu.swipeEnable(false, 'menu');
  }

  ionViewDidLoad(): void {
    this.platform.ready().then(() => {
      this.loadMarkersData();
      this.watchForChanges();
    });
  }

  watchForChanges() {
    this.firebaseData.watchForUpdates().subscribe(update => {
      console.log('updated!', update);
      this.loadMarkersData();
    });
  }

  loadMarkersData(){
    this.firebaseData.fetchUsers().then(users => {
      users = users.val();
      let arr = [];
      for (var prop in users) {
          if (!users.hasOwnProperty(prop)) {
              continue;
          }
          arr.push(users[prop]);
      }
      let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
        this.mapsCluster.addCluster(map, arr);
      });
    });
  }

  centerToMyLocation() {
    this.maps.centerToMyLocation();
  }
}

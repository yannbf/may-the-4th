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
      this.initMap();
    });
  }

  watchForChanges() {
    this.firebaseData.watchForUpdates().subscribe((update: any) => {
      this.updateOrAddMarker(update);
    });
  }

  markers = new Map<string, any>();
  map: any;

  updateOrAddMarker(data) {
    let marker = this.markers.get(data.uuid);
    if(marker){
      console.log('updated!', data);
      this.updateMarker(data, marker);
    } else {
      console.log('added!', data);
      this.addMarker(data);
    }
  }

  loadMarkersData(){
    this.firebaseData.fetchUsers().then(users => {
      users = users.val();
      let markerData = [];
      for (var prop in users) {
          if (users.hasOwnProperty(prop)) {
            markerData.push(users[prop]);
          }
      }

      let timeout = 0;
      markerData.map((data) => {
        setTimeout(this.addMarker(data),++timeout * 200)
      });
    });
  }

  updateMarker(data, marker) {
    // marker.setLabel(data.name);
    marker.setPosition(data.position);
    marker.setIcon(`assets/maps/pin-${data.side}-${this.getRandomNumber()}.png`);
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  addMarker(data) {

    let marker = new google.maps.Marker({
          clickable: true,
          position: data.position,
          animation: google.maps.Animation.DROP,
          map: this.map,
          icon: `assets/maps/pin-${data.side}-${this.getRandomNumber()}.png`,
        });

    let infowindow = new google.maps.InfoWindow({
      content: data.name
    });

    marker.addListener('click', () => {
      infowindow.open(this.map, marker);
    });

    this.markers.set(data.uuid, marker);
  }

  initMap() {
    let loadedMap = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then((map) => {
      // this.mapsCluster.setMarkers(map, arr);
      console.log(map);
      this.map = map;
      this.loadMarkersData();
      this.watchForChanges();
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }

  centerToMyLocation() {
    this.maps.centerToMyLocation();
  }
}

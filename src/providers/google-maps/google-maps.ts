import { ConnectivityProvider } from '../connectivity/connectivity';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
declare var google: any;

@Injectable()
export class GoogleMapsProvider {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  apiKey: string = "AIzaSyDJqK65u-FmN5tAldekvsSM1WtiHGfEkcs";
  markers = new Map<string, any>();

  constructor(public connectivityService: ConnectivityProvider, private geolocation: Geolocation) {

  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {
    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve, reject) => {
      if(this.map) {
        resolve(this.map);
      } else {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          console.log("Google maps JavaScript needs to be loaded.");
          this.disableMap();
          if (this.connectivityService.isOnline()) {
            window['mapInit'] = () => {
              this.initMap().then((map) => {
                resolve(map);
              });

              this.enableMap();
            }

            let script = document.createElement("script");
            script.id = "googleMaps";
            if (this.apiKey) {
              script.src = 'https://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
            } else {
              script.src = 'https://maps.google.com/maps/api/js?callback=mapInit';
            }
            document.body.appendChild(script);
          }
        }
        else {
          if (this.connectivityService.isOnline()) {
            this.initMap();
            this.enableMap();
          }
          else {
            this.disableMap();
          }
        }
        this.addConnectivityListeners();
      }
    });
  }

  initMap(): Promise<any> {

    this.mapInitialised = true;
    return new Promise((resolve) => {

      this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // let latLng = new google.maps.LatLng(-31.563910, 147.154312);

        // let mapStyles = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[    {"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}];
        let mapStyles = [ { "elementType": "geometry", "stylers": [ { "color": "#212121" } ] }, { "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#212121" } ] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [ { "color": "#757575" } ] }, { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [ { "color": "#9e9e9e" } ] }, { "featureType": "administrative.land_parcel", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [ { "color": "#bdbdbd" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "poi.business", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#181818" } ] }, { "featureType": "poi.park", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "poi.park", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1b1b1b" } ] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [ { "color": "#2c2c2c" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#8a8a8a" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#373737" } ] }, { "featureType": "road.arterial", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#3c3c3c" } ] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [ { "color": "#4e4e4e" } ] }, { "featureType": "road.local", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#616161" } ] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [ { "color": "#757575" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#000000" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#3d3d3d" } ] } ];

        let mapOptions = {
          center: latLng,
          styles: mapStyles,
          zoom: 4,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(this.map);
      });
    });
  }

  disableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }
  }

  enableMap(): void {
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }
  }

  centerToMyLocation() {
     this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.setCenter(latLng);
     });
  }

  addConnectivityListeners(): void {
    this.connectivityService.watchOnline().subscribe(() => {
      console.log("online");
      setTimeout(() => {
        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }
          this.enableMap();
        }
      }, 2000);
    });

    this.connectivityService.watchOffline().subscribe(() => {
      console.log("offline");
      this.disableMap();
    });
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

  updateMarker(data, marker) {
    marker.setPosition(data.position);
    marker.setIcon(`assets/maps/pin-${data.side}-${this.getRandomNumber()}.png`);
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }
}
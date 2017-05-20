import { GoogleImagesProvider } from '../google-images/google-images';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CacheService } from "ionic-cache";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class SwapiProvider {
 private baseUrl = "https://swapi.co/api/";

  constructor(public http: Http, public cache: CacheService, private gImages: GoogleImagesProvider) { }

  get(endpoint: string) {
    let cacheKey = endpoint;
    let request  = this.http.get(endpoint + '/').map(res => res.json());
    return this.cache.loadFromObservable(cacheKey, request);
  }

  getWithImage(endpoint): Observable<any> {
    let cacheKey = endpoint;
    let request  = this.http.get(endpoint)
      .map((res: any) => res.json())
      .flatMap((item: any) => {
        let query = 'Star wars ' + (item.name || item.title);
        return this.gImages.searchImage(query)
          .map((res: any) => {
            let image = res.items[0].link;
            console.log(query, image);
            item.image = image;
            return item;
          });
      });

    return this.cache.loadFromObservable(cacheKey, request);
  }

  getPerson(id): any {
    let endpoint = 'people/' + id;
    return this.get(this.baseUrl + endpoint);
  }

  getSpecie(id): any {
    let endpoint = 'species/' + id;
    return this.get(this.baseUrl + endpoint);
  }

  getVehicle(id): any {
    let endpoint = 'vehicle/' + id;
    return this.get(this.baseUrl + endpoint);
  }

  getFilm(id): any {
    let endpoint = 'films/' + id;
    return this.get(this.baseUrl + endpoint);
  }

  getFilms(): any {
    let endpoint = 'films';
    return this.get(this.baseUrl + endpoint);
  }
}

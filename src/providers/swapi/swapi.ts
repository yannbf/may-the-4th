import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SwapiProvider {
 private baseUrl = "http://swapi.co/api/";

  constructor(public http: Http) { }

  get(endpoint: string, params?: any, cacheKey?: string, options?: RequestOptions) {
    options = new RequestOptions();

    // Support easy query params for GET requests
    let p = new URLSearchParams();
    if (params) {
      for(let k in params) {
        p.set(k, params[k]);
      }

    }

    // Set the search field if we have params and don't already have
    // a search field set in options.
    options.search = !options.search && p || options.search;
    return this.http.get(endpoint, options).map(res => res.json());
    // return this.cache.loadFromObservable(cacheKey, request);
  }

  getPerson(id): any {
    let params = {
      id : id,
    }

    let endpoint = 'people';
    // let cacheKey = endpoint + JSON.stringify(params);
    return this.get(this.baseUrl + endpoint, params);
  }
}

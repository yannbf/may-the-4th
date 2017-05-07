import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { CacheService } from "ionic-cache/ionic-cache";
import 'rxjs/add/operator/map';

@Injectable()
export class OmdbProvider {

  private baseUrl = 'http://www.omdbapi.com/';
  private queryParams = {
    t : '',
    r : 'json'
  }

  constructor(public http: Http, public cache: CacheService) { }

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
    let request    = this.http.get(endpoint, options).map(res => res.json());
    return this.cache.loadFromObservable(cacheKey, request);
  }

  searchMovieInfo(title) {
    this.queryParams.t = title;
    return this.get(this.baseUrl, this.queryParams, 'omdb::' + title);
  }
}

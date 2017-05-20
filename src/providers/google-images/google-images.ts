import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { CacheService } from "ionic-cache";
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleImagesProvider {

  private baseUrl = 'https://www.googleapis.com/customsearch/v1';
  private apiKey  = 'AIzaSyCzb6SI_JRrp6xLLYV617Ary6n59h36ros';
  private cx      = '004286675445984025592:ypgpkv9fjd4';
  private queryParams = {
    key        : this.apiKey,
    cx         : this.cx,
    filter     : '1',
    searchType : 'image',
    q          : ''
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

  searchImage(query) {
    this.queryParams.q = query;
    return this.get(this.baseUrl, this.queryParams, 'image::' + query);
  }

}

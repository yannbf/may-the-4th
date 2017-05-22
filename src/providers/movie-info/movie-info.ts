import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieInfoProvider {

  constructor(public http: Http) {
  }

  getMovieInfo(id){
    let path = 'assets/data/' + id + '.json';
    return this.http.get(path).map(data => data.json());
  }

}

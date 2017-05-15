import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class FirebaseDataProvider {

  constructor(public http: Http) {  }

  writeUserData(user) {
    return firebase.database().ref('users/' + user.uuid).set(user);
  }

}

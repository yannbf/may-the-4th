import { AppState } from '../../app/app.global';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class FirebaseDataProvider {

  constructor(public global: AppState) {  }

  writeUserData(user) {
    return firebase.database().ref('users/' + user.uuid).set(user);
  }

  setSide(side){
    let uuid = this.global.get('uuid');
    return firebase.database().ref('users/' + uuid + '/side').transaction( () =>{
      return side;
    })
  }

}

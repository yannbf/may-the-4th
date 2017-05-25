import { AppState } from '../../app/app.global';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable()
export class FirebaseDataProvider {

  usersSubject = new Subject();
  userRef = 'userInfo/';

  constructor(public global: AppState) {  }

  writeUserData(user) {
    return firebase.database().ref(this.userRef + user.uuid).set(user);
  }

  setSide(side){
    let uuid = this.global.get('uuid');
    var ref = firebase.database().ref(this.userRef + uuid);
    ref.once('value', (snapshot) => {
      if (snapshot.exists()) {
        return firebase.database().ref(this.userRef + uuid + '/side').transaction( () =>{
          return side;
        });
      }
    });
  }

  fetchUsers() {
    return firebase.database().ref(this.userRef).once('value', snapshot => {
      return snapshot.val();
    });
  }

  watchForUpdates() {
    firebase.database()
      .ref(this.userRef)
      .on('child_added', dataSnapshot => {
        var user = dataSnapshot.val();
        this.usersSubject.next(user);
      });

    firebase.database()
      .ref(this.userRef)
      .on('child_changed', dataSnapshot => {
        var user = dataSnapshot.val();
        this.usersSubject.next(user);
      });

    return this.usersSubject;
  }

  addRandomUser() {
    let side = Math.floor(Math.random() * 2);
    let user = {
      name: 'test',
      icon: Math.floor(Math.random() * 6) + 1,
      uuid: Math.floor(Math.random() * 125123) + 1,
      side: side == 1 ? 'light' : 'dark',
      position : {
        lat: -(Math.floor(Math.random() * 6) + 1),
        lng: Math.floor(Math.random() * 30) + 5
      }
    }

    return firebase.database().ref(this.userRef + user.uuid).set(user);
  }
}

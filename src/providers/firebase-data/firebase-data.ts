import { AppState } from '../../app/app.global';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable()
export class FirebaseDataProvider {

  usersSubject    = new Subject();

  constructor(public global: AppState) {  }

  writeUserData(user) {
    return firebase.database().ref('ausers/' + user.uuid).set(user);
  }

  setSide(side){
    let uuid = this.global.get('uuid');
    return firebase.database().ref('ausers/' + uuid + '/side').transaction( () =>{
      return side;
    })
  }

  fetchUsers() {
    return firebase.database().ref('ausers').once('value', snapshot => {
      return snapshot.val();
    });
  }

  watchForUpdates() {
    firebase.database()
      .ref('ausers')
      .on('child_changed', dataSnapshot => {
        var users = dataSnapshot.val();
        this.usersSubject.next(users);
      });

    return this.usersSubject;
  }
}

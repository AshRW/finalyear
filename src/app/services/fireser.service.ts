import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FireserService {

  constructor(private auth: AngularFireAuth, private afd:AngularFireDatabase) { }

  push(path, data){
    return this.afd.object(path).set(data);
  }
  test(){
    console.log("test success");
  }
  pullList(path){
    return this.afd.list(path);
  }
  pullObject(path){
    return this.afd.object(path);
  }
}

var snapshotToArray = function(snaps){
  var returnArr = [];
  snaps.forEach(element => {
    let key = element.key;
    let obj = element.payload.val();
    obj.key = key;
    returnArr.push(obj);
  });
  return returnArr;
}
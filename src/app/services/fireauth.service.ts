import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FireauthService {

  constructor(private auth: AngularFireAuth, private afd:AngularFireDatabase) { }
  push(path, data){
    return this.afd.object(path).set(data);
  }

  login(u){
    let email = u.email;
    let pwd = u.password;
    console.log("Logged in successfully");
    return this.auth.auth.signInWithEmailAndPassword(email, pwd);
  }
  signup(u){
    let email = u.email;
    let pwd = u.password;
    console.log("Signed Up");
    return this.auth.auth.createUserWithEmailAndPassword(email,pwd);
  }
  logout()
  {
    sessionStorage.clear();
    this.auth.auth.signOut();
    console.log("Logged out");
  }
  
  resetPassword(email: string) {
    console.log(email);
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email);
  }
  test(){
    console.log("test success");
  }
}

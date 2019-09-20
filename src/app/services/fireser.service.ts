import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth/';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FireserService {

  constructor(private auth: AngularFireAuth) { }
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

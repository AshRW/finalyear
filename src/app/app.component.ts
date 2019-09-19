import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private router:Router){}
  ngOnInit(){
    console.log("Hello world");
  }
  title = 'mainproject';
  goToHome(){
    this.router.navigateByUrl("/home");
  }
  goToRegister(){
    this.router.navigateByUrl("/registration");
  }
  goToLogin(){
    this.router.navigateByUrl("/login");
  }
}


// var snapshotToArray = function(snaps){
//   var returnArr = [];
//   snaps.forEach(element => {
//     let key = element.key;
//     let obj = element.payload.val();
//     obj.key = key;
//     returnArr.push(obj);
//   });
//   return returnArr;
// }

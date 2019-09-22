import { Component, OnInit, AfterContentChecked} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked{
  logged=false;
  constructor(private router:Router){}
  ngAfterContentChecked() {
    this.check();
  }
  // ngOnChanges(){
  //   this.check();
  // }
  ngOnInit(){
    this.check();
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
  logOut(){
    sessionStorage.clear();
    this.router.navigateByUrl('/home');
  }
  check(){
    if(sessionStorage.length>0){
      this.logged=true;
    }
    else{
      this.logged=false;
    }
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

import { Component, OnInit, AfterContentChecked} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked{
  student=false;
  teacher=false;
  admin=false;
  session_data:any;
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
      this.loginas();
    }
    else{
      this.logged=false;
      this.loginas();
    }
  }
  loginas(){
    if(sessionStorage.length>0){
      this.session_data=JSON.parse(sessionStorage.getItem('key'))
    if(this.session_data.role=='student'){
      this.student=true;
      this.teacher=false;
      this.admin=false;
    }
    else if(this.session_data.role=='teacher'){
      this.teacher=true;
      this.student=false;
      this.admin=false;
    }
    else if(this.session_data.role=='admin'){
      this.admin=true;
      this.teacher=false;
      this.student=false;      
    }
    else{
      this.teacher=false;
      this.student=false;
      this.admin=false;
    }
    }
    else{
      this.teacher=false;
      this.student=false;
      this.admin=false;
    }
    
  }
  goToMoodle(){
this.router.navigateByUrl('/studentmoodle');
  }
  goToNotice(){
this.router.navigateByUrl('/studentnotice');
  }
  goToDashboard(){
this.router.navigateByUrl('/studentdash');
  }
  gotoToSetting(){
    this.router.navigateByUrl('/adminsetting')
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

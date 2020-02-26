import { Component, OnInit, AfterContentChecked} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { BASE_URL } from './base_url';
import { NoticeserService } from './services/noticeser.service';


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
  constructor(private router:Router, private afd:AngularFireDatabase, private notice:NoticeserService){}
  ngAfterContentChecked() {
    this.status_check();
    this.check();
  }
  // ngOnChanges(){
  //   this.check();
  // }
  ngOnInit(){
    this.status_check();
    this.check();
    // this.notice.getActiveNotice();
  }
  
  title = 'mainproject';
  goToadmindash(){
    this.router.navigateByUrl("/admindash")
  }
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
  status_check(){
    let status_a;
    this.afd.object(BASE_URL+'status/').snapshotChanges().subscribe(success=>{
      //console.log(success.payload.val());
      status_a=success.payload.val();
      //console.log(status_a);
      if(status_a!="active"){
        this.router.navigateByUrl('/deactive');
      }
    })
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
  gotoToAdminmoodle(){
    this.router.navigateByUrl('/adminmoodle');
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { BASE_URL } from '../base_url';

@Component({
  selector: 'app-student-dash',
  templateUrl: './student-dash.component.html',
  styleUrls: ['./student-dash.component.scss']
})
export class StudentDashComponent implements OnInit {
public loading=false;
ins_data:any;
level_data:any;
session_data:any;
student_data:any;
uid:any;
payload_data:any;
  constructor(private router:Router, private afd:AngularFireDatabase) { }

  ngOnInit() {
    //this.giantfunction();
    this.getSessionData();
  }

  getSessionData(){
    this.loading=true;
    this.session_data=JSON.parse(sessionStorage.getItem('key'));
    this.getInsData();
  }

  getInsData(){
    this.loading=true;
this.afd.object(BASE_URL).snapshotChanges().subscribe(success=>{
  
  this.ins_data=success.payload.val();
  if(this.ins_data.ins_type=="Engineering College"){
    this.level_data="Year";
  }
  else{
    this.level_data="Class";
  }
  this.getStudentData();
  this.loading=false;
}, error=>{
  console.log(error)
})
  }

  getStudentData(){
    this.afd.object(BASE_URL+'data/student/'+this.session_data.uid+'/').snapshotChanges().subscribe(success=>{
      this.student_data=success.payload.val();
      this.getClassData();
      this.loading=false;
    })
  }
  
  getClassData(){
    this.afd.object(BASE_URL+"data/class/"+this.student_data.class+"/").snapshotChanges().subscribe(success=>{
      this.payload_data=success.payload.val();
      this.student_data.teacher_id=this.payload_data.class_teacher;
      this.student_data.teacher_name=this.payload_data.class_teacher_name;
    })
  }
  giantfunction(){
    //session
    this.loading=true;
    this.session_data=JSON.parse(sessionStorage.getItem('key'));
// ins type data
this.afd.object(BASE_URL).snapshotChanges().subscribe(success=>{
  this.ins_data=success.payload.val();
  if(this.ins_data.ins_type=="Engineering College"){
    this.level_data="Year";
  }
  else{
    this.level_data="Class";
  }
  this.loading=false;
}, error=>{
  console.log(error)
})
//session -> student data
this.afd.object(BASE_URL+'data/student/'+this.session_data.uid+'/').snapshotChanges().subscribe(success=>{
  this.student_data=success.payload.val();
  this.loading=false;
})
//classdata
this.afd.object(BASE_URL+"data/class/"+this.student_data.class+"/").snapshotChanges().subscribe(success=>{
  this.payload_data=success.payload.val();
  this.student_data.teacher_id=this.payload_data.class_teacher;
  this.student_data.teacher_name=this.payload_data.class_teacher_name;
})
  }
  goToResult(){
this.router.navigateByUrl('/studentresult')
  }
  goToFeedback(){
    this.router.navigateByUrl('/studentchatlist')
  }
  goToApplicatio(){
    this.router.navigateByUrl('/studentchatlist');
  }
  goToChat(){
this.router.navigateByUrl('/studentchatlist');
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
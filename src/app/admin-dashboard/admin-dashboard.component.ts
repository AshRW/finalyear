import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BASE_URL } from '../base_url';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  public loading = false;
  constructor(private afd:AngularFireDatabase, private router:Router, private as:AdminService) {}
student_data:any=[];
teacher_data:any=[];
sessiondata:any;
//session_data:any;
  ngOnInit() {
    //this.checkLogin();
    this.getSession();
  }
  getSession(){
    if(sessionStorage.length>0){
      // logged in
      this.sessiondata=JSON.parse(sessionStorage.getItem('key'))
      if(this.sessiondata.admin_access==true){
        this.getStudent();
        this.getTeacher();
      }
      else{
        this.router.navigateByUrl('/home')
      Swal.fire(
        "You Do not have admin rights",
        'You need admin rights, contact admin for info',
        'info'
      )
      }
    }else{
      //not logged in
      this.router.navigateByUrl('/home')
      Swal.fire(
        "Please Login First",
        'Login to access this page',
        'info'
      )
    }
  }

  getStudent(){
    this.loading = true;
    this.afd.list(BASE_URL+'data/student/', ref=>ref.orderByChild('status').equalTo(false)).snapshotChanges().subscribe(success=>{
      //console.log(snapshotToArray(success));
      this.student_data=snapshotToArray(success);
    })
  }
  getTeacher(){
    this.afd.list(BASE_URL+"data/teacher/", ref=>ref.orderByChild('status').equalTo(false)).snapshotChanges().subscribe(success=>{
      //console.log(snapshotToArray(success));
      this.teacher_data=snapshotToArray(success);
      this.loading = false;
    })
  }
  verifyS(i){
    this.afd.object(BASE_URL+'data/student/'+this.student_data[i].uid).update({"status":true})
  }
  verifyT(i){
    this.afd.object(BASE_URL+'data/teacher/'+this.teacher_data[i].uid).update({"status":true})
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

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BASE_URL } from '../base_url';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private afd:AngularFireDatabase) { }
student_data:any=[];
teacher_data:any=[];
  ngOnInit() {
    this.getStudent();
    this.getTeacher();
  }
  getStudent(){
    this.afd.list(BASE_URL+'data/student/', ref=>ref.orderByChild('status').equalTo(false)).snapshotChanges().subscribe(success=>{
      console.log(snapshotToArray(success));
      this.student_data=snapshotToArray(success);
    })
  }
  getTeacher(){
    this.afd.list(BASE_URL+"data/teacher/", ref=>ref.orderByChild('status').equalTo(false)).snapshotChanges().subscribe(success=>{
      console.log(snapshotToArray(success));
      this.teacher_data=snapshotToArray(success);
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

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireserService } from '../services/fireser.service';
import { TransferService } from '../services/transfer.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { data } from 'jquery';
import { element } from 'protractor';

@Component({
  selector: 'app-feedbacklist-student',
  templateUrl: './feedbacklist-student.component.html',
  styleUrls: ['./feedbacklist-student.component.scss']
})
export class FeedbacklistStudentComponent implements OnInit {

  constructor(private router:Router, private afd:FireserService, private transfer:TransferService, private afdd:AngularFireDatabase) { }
  public loading=false;
  auth_admin=false;
  newfeedbackbutton=false;
  sessiondata:any
  activeFeedback:any=[]
  classListData:any=[]

  ngOnInit() {
    // this.loading=true
    this.getSession();
  }

  getSession(){
    if(sessionStorage.length>0){
      this.sessiondata=JSON.parse(sessionStorage.getItem('key'))
      console.log("loggedIN")
      this.getClasses();
      this.getfeedbacks2();
      // logged in
    if(this.sessiondata.admin_access==true){
      this.auth_admin=true
    }
    this.loading=false
    }else{
      this.loading=false
      //not logged in
      this.router.navigateByUrl('/home')
      Swal.fire(
        "Please Login First",
        'Login to access this page',
        'info'
      )
    }
  }

  getfeedbacks(){
    let temp:any=[];
    let data:any=[];
    this.afd.pullListFilter('data/feedback/', "for", this.sessiondata.class).snapshotChanges().subscribe(success=>{
      data=this.afd.snapshotToArray2(success);
      data.forEach(element => {
        if(element.status==true)
        temp.push(element)
      });
      this.activeFeedback=temp;
      // this.activeFeedback=this.afd.snapshotToArray2(success)
    })
  }
  getfeedbacks2(){
    let temp:any=[];
    let data:any=[];
    this.afd.pullListFilter('data/feedback/', "status", true).snapshotChanges().subscribe(success=>{
      data=this.afd.snapshotToArray2(success);
      data.forEach(element => {
        if(element.for+"_"+element.branch==this.sessiondata.class+"_"+this.sessiondata.department)
        temp.push(element)
        else if(element.for+"_"+element.branch=="ALL_ALL")
        temp.push(element)
      });
      this.activeFeedback=temp;
      // this.activeFeedback=this.afd.snapshotToArray2(success)
    })
  }
  getClasses(){
    let type:any
    this.afd.pullObject('ins_type/').snapshotChanges().subscribe(success=>{
      type=success.payload.val();
      this.afd.pullListWithoutBase('institute_type/'+type+'/Year').snapshotChanges().subscribe(success=>{
        this.classListData=this.afd.snapshotToArray2(success)
      })

    })
  }
  open(i:any){
    this.transfer.setObject(this.activeFeedback[i])
    this.router.navigateByUrl('/studentfeedback');
  }

}

import { Component, OnInit } from '@angular/core';
import { FireserService } from '../services/fireser.service';
import { BASE_URL } from '../base_url';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-student-notice',
  templateUrl: './student-notice.component.html',
  styleUrls: ['./student-notice.component.scss']
})
export class StudentNoticeComponent implements OnInit {

  constructor(private afd:AngularFireDatabase, private router:Router) { }
admin_status:any;
date:any;
time:any;
activeNotice:any=[];
public loading = false;
sessiondata:any;
auth_admin=false;
  ngOnInit() {
    this.getSession();
  }

  getSession(){
    if(sessionStorage.length>0){
      this.sessiondata=JSON.parse(sessionStorage.getItem('key'))
      console.log("loggedIN")
      // logged in
      this.getTime();
    this.getActiveNotice();
    if(this.sessiondata.admin_access==true){
      this.auth_admin=true
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


  getTime(){
    this.loading=true;
    let myDate = new Date();
    var hour = myDate.getHours();
    var minutes = myDate.getMinutes();
    var sec=myDate.getSeconds();
    this.date = (myDate.getDate()+"/"+myDate.getMonth()+"/"+myDate.getFullYear());
    this.time=hour+":"+minutes;
    this.loading=false;
  }

  // getActiveNotice(){     //Trial
  //   this.loading=true;
  //   this.afd.pullList("data/notice/").snapshotChanges().subscribe(success=>{
  //     this.activeNotice=snapshotToArray(success);
  //     // console.log(this.activeNotice);
  //     this.loading=false;
  //   })
  // }
  getActiveNotice(){
    this.loading=true;
    this.afd.list(BASE_URL+"data/notice/", ref=>ref.orderByChild('status').equalTo("active")).snapshotChanges().subscribe(success=>{
      this.activeNotice=snapshotToArray(success)
      console.log(snapshotToArray(success))
      this.loading=false;
    })
  }
  newNotice(){
    this.router.navigateByUrl('/newnotice')
  }

  clicker(index:any){
    // console.log("clicked")
    Swal.fire({type:'info',title: "Title: "+this.activeNotice[index].title+" \nDesc: "+this.activeNotice[index].desc, text:" \nGiven Date: "+this.activeNotice[index].given_date+", \nFor Date: "+this.activeNotice[index].for_date});
  }
  deleteNotice(i){Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.value) {
    //console.log(BASE_URL+'date/notice/'+this.activeNotice[i].uid+'/')
    this.afd.object(BASE_URL+'data/notice/'+this.activeNotice[i].uid+'/').remove().then(_=>
      Swal.fire(
      'Deleted!',
      'Notice has been deleted',
      'success'
    ))

    }
  })


  }
  delcan(){
    console.log("cancel");

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

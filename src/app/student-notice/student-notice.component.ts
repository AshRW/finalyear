import { Component, OnInit } from '@angular/core';
import { FireserService } from '../services/fireser.service';
import { BASE_URL } from '../base_url';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-notice',
  templateUrl: './student-notice.component.html',
  styleUrls: ['./student-notice.component.scss']
})
export class StudentNoticeComponent implements OnInit {

  constructor(private afd:FireserService, private router:Router) { }
admin_status:any;
date:any;
time:any;
activeNotice:any=[];
public loading = false;
  ngOnInit() {
    this.getLoginStatus();
    this.getTime();
    this.getActiveNotice();
    this.dis();
    
  }
  getLoginStatus(){
    this.admin_status=sessionStorage.getItem('key');
  }

  dis(){
    console.log(this.admin_status)
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

  getActiveNotice(){
    this.loading=true;
    this.afd.pullList(BASE_URL+"data/notice/").snapshotChanges().subscribe(success=>{
      this.activeNotice=snapshotToArray(success);
      //console.log(this.activeNotice);
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
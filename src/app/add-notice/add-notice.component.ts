import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { FireserService } from '../services/fireser.service';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.scss']
})
export class AddNoticeComponent implements OnInit {

  constructor(private afd:FireserService, private router:Router) { }
  public loading=false
  date:any
  time:any
  sessiondata:any;
  auth_admin:any;
  formdata:any;
  date_cons:any
  ngOnInit() {
    this.getSession();
  }

  getSession(){
    if(sessionStorage.length>0){
      this.sessiondata=JSON.parse(sessionStorage.getItem('key'))
      console.log("loggedIN")
      // logged in

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

  noticeform: any = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    for:new FormControl('', Validators.required),
    for_date:new FormControl('', Validators.required)
  });
  button(){
    this.dateconstructor()
    this.getTime()
    this.send()
  }

  dateconstructor(){
    // console.log(this.noticeform.value)
    let date_temp=this.noticeform.value.for_date
    this.date_cons=date_temp.slice(8,11)
    this.date_cons=this.date_cons+'/'+date_temp.slice(5,7)
    this.date_cons=this.date_cons+'/'+date_temp.slice(0, 4)
    //console.log(this.date_cons);
  }
  getTime(){
    this.loading=true;
    let myDate = new Date();
    let new_month:any
    var hour = myDate.getHours();
    var minutes = myDate.getMinutes();
    var sec=myDate.getSeconds();
    var monthproper=(myDate.getMonth()+1)
    if(monthproper<10){
      new_month='0'+monthproper
    }
    // console.log(new_month)
    this.date = (myDate.getDate()+"/"+new_month+"/"+myDate.getFullYear());
    this.time=hour+":"+minutes;
    // console.log(this.date+this.time)
    this.loading=false;
  }

  send(){
    let u:any;
    let pushkey =this.afd.giveAKey();
    this.formdata=this.noticeform.value
    u={
      "by":this.sessiondata.role,
      "title":this.formdata.title,
      "desc":this.formdata.desc,
      "for_date":this.date_cons,
      "for":this.formdata.for,
      "status":"active",
      "uid":pushkey,
      "given_date": this.date
    }
    this.afd.push('data/notice/'+pushkey+'/',u)
    console.log(u)
    this.router.navigateByUrl('/home')
    Swal.fire({
      type:"info",
      title:"Notice added!"
    })
  }

}

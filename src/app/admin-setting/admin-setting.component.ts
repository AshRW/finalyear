import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FireserService } from '../services/fireser.service';
import { error } from 'protractor';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent implements OnInit {

  constructor(private router:Router, private afd:FireserService) { }
  sessiondata:any;
  public loading=false
  teachers:any=[]
  ngOnInit() {
    this.getSession();
  }
  getSession(){
    this.loading=true;
    if(sessionStorage.length>0){
      // logged in
      this.sessiondata=JSON.parse(sessionStorage.getItem('key'))
      if(this.sessiondata.admin_access==true){
        this.getTeachers();
        // functions to work
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
  getTeachers(){
    this.afd.pullList('data/teacher/').snapshotChanges().subscribe(success=>{
      this.teachers=this.afd.snapshotToArray2(success)
      this.loading=false;
    }, error=>{console.log(error)})
  }
  toggle(i){
    this.loading=true;
    //console.log(this.teachers[i].uid)
    if(this.teachers[i].admin_access==false){
      this.afd.update('data/teacher/'+this.teachers[i].uid+'/', {"admin_access":true}).then(_=>
        this.loading=false)
    }
    else if(this.teachers[i].admin_access==true){
      this.afd.update('data/teacher/'+this.teachers[i].uid+'/', {"admin_access":false}).then(_=>
        this.loading=false)
    }
  }


}

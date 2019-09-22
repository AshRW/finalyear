import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import {FireserService} from '../services/fireser.service';
import {BASE_URL} from '../base_url';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {
  public loading = false;
  constructor(private afd:AngularFireDatabase, private fire:FireserService, private router:Router) { }
  
  ngOnInit() {
    this.getLevelAndDepartment();
  }
  
  send_data:any;
  push_id:any;
  studentregForm:any = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    department:new FormControl('', Validators.required)
  });
  ins_type:any;
  department:any=[];
  level:any=[];
  level_type:any;
  ins_type_data:any;
  
  register(){
    this.send_data=this.studentregForm.value;
    this.send_data.status=false;
    this.send_data.role="student";
    this.send_data.uid=this.push_id;
    console.log(this.send_data);
    this.fire.signup(this.send_data).then(success=>{
      console.log(success.user.uid);
      this.push_id=success.user.uid;
      this.send_data.uid=this.push_id;
      console.log(BASE_URL+"data/student/"+this.push_id+"/");
      this.afd.object(BASE_URL+"data/student/"+this.push_id+"/").set(this.send_data).then(success=>{
        console.log(success);
        Swal.fire({
          type: 'success',
          title: 'Registered Successfully!',
          footer: 'You may Login after Admin Verification of your ID'
        })
        this.router.navigateByUrl('/home');
      },error=>{
        console.log(error);
      })
    }, error=>{console.log("error");})
  }
  getLevelAndDepartment(){
    this.loading=true;
   
    this.afd.object(BASE_URL+'ins_type').snapshotChanges().subscribe(success=>{
      this.ins_type=success.payload.val();
      
      this.afd.object('/institute_type/'+this.ins_type+'/').snapshotChanges().subscribe(success=>{
        this.ins_type_data=success.payload.val();//full data in this <---
        console.log(this.ins_type_data);
        this.level_type=this.ins_type_data.level;//storing level type, ie level_type=Year
        if(this.level_type=='Year'){
          for(let i=0;i<this.ins_type_data.Year.length;i++){
            this.level[i]=this.ins_type_data.Year[i];
          }
          console.log(this.level);
        }
        else{
          for(let i=0;i<this.ins_type_data.Class.length;i++){
            this.level[i]=this.ins_type_data.Class[i];
          }
          console.log(this.level);
        }
        for(let i=0;i<this.ins_type_data.department.length;i++){
          this.department[i]=this.ins_type_data.department[i];
        }
        console.log(this.department);
        this.loading=false;

      })
      
    })
    
  }

}
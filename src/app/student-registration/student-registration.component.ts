import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import {FireserService} from '../services/fireser.service';
import {BASE_URL} from '../base_url';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {

  constructor(private afd:AngularFireDatabase) { }

  ngOnInit() {
    this.getLevelAndDepartment();
  }
  send_data:any;
  push_id:any;
  studentregForm:any = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required)
  });
  ins_type:any;
  department:any=[];
  level:any=[];
level_type:any;
  ins_type_data:any;
  
  register(){
    this.push_id=this.afd.createPushId();
    this.send_data=this.studentregForm.value;
    this.send_data.status=false;
    this.send_data.role="student";
    this.send_data.uid=this.push_id;
    console.log(this.send_data);
  }
  getLevelAndDepartment(){
   
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

      })
      
    })
  }

}

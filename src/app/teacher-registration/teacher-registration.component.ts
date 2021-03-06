import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { FireserService } from '../services/fireser.service';
import { BASE_URL } from '../base_url';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FireauthService } from '../services/fireauth.service';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.scss']
})
export class TeacherRegistrationComponent implements OnInit {

  constructor(private afd:AngularFireDatabase, private fire:FireauthService, private router:Router) { }

  ngOnInit() {
  }
  teacherregForm:any = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });
  form_data:any;
  register(){
    this.form_data=this.teacherregForm.value;
    this.form_data.admin_access=false;
    this.form_data.role="teacher";
    this.form_data.status=false;
    console.log(this.form_data);
    this.fire.signup(this.form_data).then(success=>{
      console.log(success.user.uid);
      this.form_data.uid=success.user.uid;
      this.afd.object(BASE_URL+'data/teacher/'+success.user.uid+'/').set(this.form_data).then(success=>{
        console.log(success);
        Swal.fire({
          type: 'success',
          title: 'Registered Successfully!',
          footer: 'You may Login after Admin Verification of your ID'
        })
        this.router.navigateByUrl('/home');
      }, error=>{console.log(error)})
    }, error=>{console.log(error)})
  }
  
}

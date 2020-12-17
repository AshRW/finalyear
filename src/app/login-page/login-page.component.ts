import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { BASE_URL } from '../base_url';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private router:Router, private afd:AngularFireDatabase) { }
form_data:any;
success_data:any;
  ngOnInit() {
  }
  loginForm: any = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  goToAdminLogin(){
    this.router.navigateByUrl('/adminlogin')
  }

  loginTeacher(){
    this.form_data=this.loginForm.value;
this.afd.list(BASE_URL+'data/teacher', ref=>ref.orderByChild('email').equalTo(this.form_data.email)).snapshotChanges().subscribe(success=>{
  
  //console.log(this.success_data)
  //console.log(this.success_data);
  if(snapshotToArray(success).length==0){
    Swal.fire({
      type: 'error',
      title: 'Account Not Found',
      footer: 'Please Register First'
    })
  }
  else if(snapshotToArray(success).length==1){
    this.success_data=snapshotToArray(success);
    this.success_data=this.success_data[0];
    console.log(this.success_data)
    if(this.success_data.status==false){
      Swal.fire({
        type: 'error',
        title: 'Account Not Yet Verified',
        text: 'Account registered but not verified',
        footer: 'Please Ask Admin to Verify First'
      })
    }
    else if(this.success_data.password==this.form_data.password){
      sessionStorage.setItem("key", JSON.stringify(this.success_data))
      this.router.navigateByUrl('/teacherdash')
    }
    else{
      Swal.fire({
        type: 'error',
        title: 'Email or Password is Wrong!',
        footer: 'Check your details'
      })      
    }
  }


}, error=>{
  Swal.fire({
    type: 'error',
    title: 'Account Not Found',
    footer: 'Please Register First'
  })
})
  }
  loginStudent(){
    this.form_data=this.loginForm.value;
    this.afd.list(BASE_URL+'data/student', ref=>ref.orderByChild('email').equalTo(this.form_data.email)).snapshotChanges().subscribe(success=>{
      if(snapshotToArray(success).length==0){
        Swal.fire({
          type: 'error',
          title: 'Account Not Found',
          footer: 'Please Register First'
        })
      }
      else if(snapshotToArray(success).length==1){
        this.success_data=snapshotToArray(success);
        this.success_data=this.success_data[0];
        console.log(this.success_data)
        if(this.success_data.status==false){
          Swal.fire({
            type: 'error',
            title: 'Account Not Yet Verified',
            text: 'Account registered but not verified',
            footer: 'Please Ask Admin to Verify First'
          })
        }
        else if(this.success_data.password==this.form_data.password){
          sessionStorage.setItem("key", JSON.stringify(this.success_data))
          this.router.navigateByUrl('/studentdash')
        }
        else{
          Swal.fire({
            type: 'error',
            title: 'Email or Password is Wrong!',
            footer: 'Check your details'
          })      
        }
      }
    
    
    }, error=>{
      Swal.fire({
        type: 'error',
        title: 'Account Not Found',
        footer: 'Please Register First'
      })
    })
  }
  goToResetPassword(){
    
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { BASE_URL } from '../base_url';
import { Router } from '@angular/router';

@Component({
  selector: 'app-institute-admin-login',
  templateUrl: './institute-admin-login.component.html',
  styleUrls: ['./institute-admin-login.component.scss']
})
export class InstituteAdminLoginComponent implements OnInit {

  constructor(private afd:AngularFireDatabase, private router:Router) { }
admin_data:any;
login_data:any;
  ngOnInit() {
    this.getAdmin();
  }
  loginForm: any = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  adminlogin(){
    this.login_data=this.loginForm.value;
    //console.log(this.login_data.name)
    if(this.login_data.name==this.admin_data.name){
      if(this.login_data.password==this.admin_data.password){
        console.log("Logged In")
        this.router.navigateByUrl('/admindash');
      }
    }
  }

  getAdmin(){
    this.afd.object(BASE_URL+'data/admin/').snapshotChanges().subscribe(success=>{
      console.log(success.payload.val());
      this.admin_data=success.payload.val();
    }, error=>{console.log(error);
    })
  }
}

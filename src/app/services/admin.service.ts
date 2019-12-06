import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  session_data:any;
  constructor(private router:Router) { }
  checkLogin(){
    if(sessionStorage.length>0){//something in session
      this.session_data = JSON.parse(sessionStorage.getItem("key"));
      if(this.session_data.role!='admin'){
        Swal.fire({
          type: 'error',
          title: 'Admins Only',
          footer: 'Access Denied'
        })
        this.router.navigateByUrl('/home');
      }
      else{
        console.log("logged in");
      }
    }
    else{
      Swal.fire({
        type: 'error',
        title: 'Admins Only',
        footer: 'Access Denied'
      })
      this.router.navigateByUrl('/home');
    }
  }
}

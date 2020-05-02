import { Component, OnInit} from '@angular/core';
import { TransferService } from '../services/transfer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrls: ['./student-feedback.component.scss']
})
export class StudentFeedbackComponent implements OnInit {

  constructor(private transfer:TransferService, private router:Router) { }
  //data members
  public loading=false
  sourceURL:any;
  transferdata:any;
  sessiondata:any;
  ngOnInit() {
  this.getSession()
    // this.sourceURL="https://docs.google.com/forms/d/e/1FAIpQLSffq0w3uCyY3l8CgUnGRP3T1d2sgFPiUc_2Hhv5XoUXB_NFxg/viewform?usp=sf_link"
  }

  //session stuff
  getSession(){
    if(sessionStorage.length>0){
      this.sessiondata=JSON.parse(sessionStorage.getItem('key'))
      console.log("loggedIN")
      // logged in
      this.getTransferData()
    // if(this.sessiondata.admin_access==true){
    //   this.auth_admin=true
    // }
    this.loading=false
    }else{
      this.loading=false
      //not logged in
      this.router.navigateByUrl('/home')
      Swal.fire(
        "Please Login First",
        'Login to access this page',
        'info'
      )
    }
  }

  getTransferData(){
    this.transferdata=this.transfer.getObject();
    this.sourceURL=this.transferdata.link
  }
}

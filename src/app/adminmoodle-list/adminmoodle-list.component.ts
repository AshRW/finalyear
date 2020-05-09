import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from '../services/transfer.service';
import Swal from 'sweetalert2';
import { FireserService } from '../services/fireser.service';

@Component({
  selector: 'app-adminmoodle-list',
  templateUrl: './adminmoodle-list.component.html',
  styleUrls: ['./adminmoodle-list.component.scss']
})
export class AdminmoodleListComponent implements OnInit {

  constructor(private router:Router, private transfer:TransferService, private afd:FireserService) { }

  //data
  public loading=false;
  sessiondata:any;
  department:any=[];

  ngOnInit() {
    this.getSession();
  }

  getSession(){
    if(sessionStorage.length>0){
      // logged in
      this.sessiondata=JSON.parse(sessionStorage.getItem('key'))
      if(this.sessiondata.admin_access==true){
        this.getStuff();
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
  getStuff(){
    this.afd.pullList('data/moodle/').snapshotChanges().subscribe(success=>{
      this.department= this.afd.snapshotToArray2(success);
    })
  }
  goToMoodle(index){
    this.transfer.setObject(this.department[index].key)
    console.log(this.transfer.getObject())
    this.router.navigateByUrl('/adminmoodle')
  }
}

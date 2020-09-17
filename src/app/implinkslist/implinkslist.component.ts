import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { FireserService } from '../services/fireser.service';
import { TransferService } from '../services/transfer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-implinkslist',
  templateUrl: './implinkslist.component.html',
  styleUrls: ['./implinkslist.component.scss']
})
export class ImplinkslistComponent implements OnInit {

  constructor(private router:Router, private afd:FireserService, private transfer:TransferService, private afdd:AngularFireDatabase) { }
  public loading=false;
  public sessiondata:any
  public auth_admin=false
  public classListData:any=[];
  public activeImpLinks:any=[];
  ngOnInit() {
    this.getSession();
  }
  getSession(){
    if(sessionStorage.length>0){
      this.sessiondata=JSON.parse(sessionStorage.getItem('key'))
      console.log("loggedIN")
      this.getClasses();
      this.getfeedbacks2();
      // logged in
    if(this.sessiondata.admin_access==true){
      this.auth_admin=true
    }
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
  getClasses(){
    let type:any
    this.afd.pullObject('ins_type/').snapshotChanges().subscribe(success=>{
      type=success.payload.val();
      this.afd.pullListWithoutBase('institute_type/'+type+'/Year').snapshotChanges().subscribe(success=>{
        this.classListData=this.afd.snapshotToArray2(success)
      })

    })
  }

  getfeedbacks2(){
    let temp:any=[];
    let data:any=[];
    this.afd.pullListFilter('data/implink/', "status", true).snapshotChanges().subscribe(success=>{
      data=this.afd.snapshotToArray2(success);
      data.forEach(element => {
        if(element.year+"_"+element.dept==this.sessiondata.class+"_"+this.sessiondata.department)
        temp.push(element)
        else if(element.for+"_"+element.branch=="ALL_ALL")
        temp.push(element)
      });
      this.activeImpLinks=temp;
      // this.activeFeedback=this.afd.snapshotToArray2(success)
    })
  }

  open(i:any){
    this.transfer.setObject(this.activeImpLinks[i])
    this.router.navigateByUrl('/studentfeedback');
  }

}

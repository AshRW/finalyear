import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireserService } from '../services/fireser.service';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss']
})
export class FeedbackListComponent implements OnInit {

  constructor(private router:Router, private afd:FireserService, private transfer:TransferService) { }
  public loading=false;
  auth_admin=false;
  newfeedbackbutton=false;
  sessiondata:any
  activeFeedback:any=[]
  classListData:any=[]
  ngOnInit() {
    this.loading=true
    this.getSession();
  }
  //Form
  newFolderForm: any = new FormGroup({
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    for:  new FormControl('', Validators.required)
  });
  //session stuff
  getSession(){
    if(sessionStorage.length>0){
      this.sessiondata=JSON.parse(sessionStorage.getItem('key'))
      console.log("loggedIN")
      this.getClasses();
      this.getfeedbacks();
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
  newFeedbackButton(){
    this.newfeedbackbutton=true;
  }
  getfeedbacks(){
    this.afd.pullList('data/feedback/').snapshotChanges().subscribe(success=>{
      this.activeFeedback=this.afd.snapshotToArray2(success)
    })
  }
  cancel(){
    this.newfeedbackbutton=false;
  }
  new_feedback(){
    let u:any;
    let key:any;
    let path:any;
    key=this.afd.giveAKey();
    u={
      "uid":key,
      "for":this.newFolderForm.value.for,
      "name":this.newFolderForm.value.name,
      "link":this.newFolderForm.value.link, "status":true
    }
    path="data/feedback/"+key+"/"
    this.afd.push(path,u).then(_=>{
      console.log("AFD Push done")
    })
  }
  toggle(i:any){
    if(this.activeFeedback[i].status==true){
      this.afd.update('data/feedback/'+this.activeFeedback[i].uid+'/', {"status":false})
    }else if(this.activeFeedback[i].status==false){
      this.afd.update('data/feedback/'+this.activeFeedback[i].uid+'/', {"status":true})
    }

  }
  deleteFeedback(i:any){
    let path='data/feedback/'+this.activeFeedback[i].uid+'/'
    this.afd.delete(path).then(_=>{
      console.log("deleted")
    })
  }

  open(i:any){
    this.transfer.setObject(this.activeFeedback[i])
    this.router.navigateByUrl('/studentfeedback');
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

}

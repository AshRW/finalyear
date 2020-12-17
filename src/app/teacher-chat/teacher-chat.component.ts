import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BASE_URL } from '../base_url';

@Component({
  selector: 'app-teacher-chat',
  templateUrl: './teacher-chat.component.html',
  styleUrls: ['./teacher-chat.component.scss']
})
export class TeacherChatComponent implements OnInit {

  constructor(private afd:AngularFireDatabase, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.getAll();
  }
  public loading=false;
  msgForm:any=new FormGroup({
    message:new FormControl('', Validators.required)
  });
  chatdata:any=[];
  sender:any;
  receiver:any;
  chat_main_data:any;
  uid:any="58ZVPY7EFHbPzPjzc8ZX4r8gXLc2";
  u:any;
  getAll(){
    this.afd.object(BASE_URL+'data/chat_data/chat_uid/').snapshotChanges().subscribe(success=>{
      this.chat_main_data=success.payload.val();
      console.log(this.chat_main_data);

      this.afd.list(BASE_URL+'data/chat_data/chat_uid/data/').snapshotChanges().subscribe(success=>{
        this.chatdata=snapshotToArray(success);
        this.sortByDate();
        if(this.chat_main_data.student_id==this.uid){
          this.receiver=this.chat_main_data.teacher_id;
        }else{
          this.receiver=this.chat_main_data.student_id;
        }
      }, error=>{console.log(error);})
    });
    
  }
  send(){
    
    const key=this.afd.createPushId();
    let path = BASE_URL+"data/chat_data/chat_uid/data/"+ key ;
    let myDate = new Date();
    var hour = myDate.getHours();
    var minutes = myDate.getMinutes();
    var date = (myDate.getDate()+"-"+myDate.getMonth()+"-"+myDate.getFullYear());
    var time=hour+":"+minutes;
    this.u={"msg":this.msgForm.value.message, "sender":this.uid, "receiver":this.receiver, "time":time, "date":date};
    this.msgForm.reset();
    //console.log(this.msgForm.value);
    if(this.u.msg==""){
      console.log("No Empty message")
    }
    else
    console.log(this.u);
    this.afd.object(path).set(this.u);
  }
  sortByDate()
  {
    this.chatdata = this.chatdata.sort((a,b)=> {
      return a.date - b.date;
    }); 
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

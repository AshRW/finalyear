import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {BASE_URL} from '../base_url';
import {NoticeserService} from '../services/noticeser.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public loading = false;
  constructor(private afd:AngularFireDatabase, private noticeser:NoticeserService) { }
  ins_name:any;
  first:any=[];
  second:any=[];
  third:any=[];
  final:any=[];
  public notice_data;any=[];
  ngOnInit() {
    this.getInstitute();
    this.getNoticeData();
  }
  
  getInstitute(){
    this.loading = true;
    this.afd.object(BASE_URL+'ins_name/').snapshotChanges().subscribe(success=>{
      this.ins_name=success.payload.val();
      this.loading = false;
    })
  }

  getNoticeData(){
    this.afd.list(BASE_URL+'data/notice/').snapshotChanges().subscribe(success=>{
      this.notice_data=snapshotToArray(success);
      console.log(this.notice_data);
      for(let i=0;i<this.notice_data.length;i++){
        if(this.notice_data[i].for=="1st")
        this.first.push(this.notice_data[i])
        else if(this.notice_data[i].for=="2nd")
        this.second.push(this.notice_data[i])
        else if(this.notice_data[i].for=="3rd")
        this.third.push(this.notice_data[i])
        else if(this.notice_data[i].for=="Final")
        this.final.push(this.notice_data[i])
      }
    })
  }

  clicker_first(index:any){
    Swal.fire({
      type:'info',
      title: this.first[index].title, 
      text:"Desc: "+this.first[index].desc,
      footer:"For Date: "+this.first[index].for_date+" Given Date: "+this.first[index].given_date
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

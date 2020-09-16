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
  public notice_data:any=[];
  public highlights:any=[];
  ngOnInit() {
    this.getInstitute();
    this.getNoticeData();
    this.getHighlightData();
  }
  getHighlightData(){
    this.afd.list(BASE_URL+'data/highlights/').snapshotChanges().subscribe(success=>{
      this.highlights=snapshotToArray(success);
      // console.log(this.highlights);
    })
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
      // console.log(this.notice_data);
      for(let i=0;i<this.notice_data.length;i++){
        if(this.notice_data[i].for=="1st")
        this.first.push(this.notice_data[i])
        else if(this.notice_data[i].for=="2nd")
        this.second.push(this.notice_data[i])
        else if(this.notice_data[i].for=="3rd")
        this.third.push(this.notice_data[i])
        else if(this.notice_data[i].for=="Final")
        this.final.push(this.notice_data[i])
        else if (this.notice_data[i].for=="ALL_ALL"){
          this.first.push(this.notice_data[i])
          this.second.push(this.notice_data[i])
          this.third.push(this.notice_data[i])
          this.final.push(this.notice_data[i])

        }
      }
    })
  }

  clicker_first(index:any, swi:any){
    switch (swi) {
      case 1: {
        Swal.fire({
          type:'info',
          title: this.first[index].title, 
          text:"Desc: "+this.first[index].desc,
          footer:"For Date: "+this.first[index].for_date+" Given Date: "+this.first[index].given_date
        });
      }
        break;
        case 2:{
          Swal.fire({
            type:'info',
            title: this.second[index].title, 
            text:"Desc: "+this.second[index].desc,
            footer:"For Date: "+this.second[index].for_date+" Given Date: "+this.second[index].given_date
          });
        }
        break;
        case 3:{
          Swal.fire({
            type:'info',
            title: this.third[index].title, 
            text:"Desc: "+this.third[index].desc,
            footer:"For Date: "+this.third[index].for_date+" Given Date: "+this.third[index].given_date
          });
        }
        break;
        case 4:{
          Swal.fire({
            type:'info',
            title: this.final[index].title, 
            text:"Desc: "+this.final[index].desc,
            footer:"For Date: "+this.final[index].for_date+" Given Date: "+this.final[index].given_date
          });
        }
        break;
    }
    
  }
  clicker_second(index:any){
    Swal.fire({
      type:'info',
      title: this.highlights[index].title, 
      text:"Whats the News!: "+this.highlights[index].desc
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

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BASE_URL } from '../base_url';

@Injectable({
  providedIn: 'root'
})
export class NoticeserService {

  constructor(private afd:AngularFireDatabase) {}
public active_notice:any=[];
  get1stYear(){
    this.getActiveNotice();
    let data=[];
    for(let i=0;i<this.active_notice.length;i++){
      if(this.active_notice.for=="1st")
      data.push(this.active_notice[i]);
    }
    //console.log(data);
    return data;
  }
  get2ndYear(){
  }
  get3rdYear(){
  }
  noticeDateCheck(){
  }
  getActiveNotice(){
    this.afd.list(BASE_URL+'data/notice/', ref=>ref.orderByChild('status').equalTo('active')).snapshotChanges().subscribe(success=>{
      this.active_notice=snapshotToArray(success);
     // console.log(this.active_notice);
      // return snapshotToArray(success);
    })
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
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {BASE_URL} from '../base_url';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private afd:AngularFireDatabase) { }
  test:any;
  ngOnInit() {
    console.log(BASE_URL+'data/teacher/unique_id/class/');
  this.afd.object(BASE_URL+'data/teacher/unique_id/class/').snapshotChanges().subscribe(success=>{
    console.log(success.payload.val());
    this.test=success.payload.val();
    for(let i=0; i<3;i++){
      console.log(this.test[i]);
    }
  })
  }
trial(){
  this.afd.object(BASE_URL+"/data/test/").set({"lol":"okay"})
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

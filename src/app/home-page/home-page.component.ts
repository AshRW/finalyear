import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {BASE_URL} from '../base_url';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public loading = false;
  constructor(private afd:AngularFireDatabase) { }
  ins_name:any;

  ngOnInit() {
    this.getInstitute();
  }
  getInstitute(){
    this.loading = true;
    this.afd.object(BASE_URL+'ins_name/').snapshotChanges().subscribe(success=>{
      this.ins_name=success.payload.val();
      this.loading = false;
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

import { Component, OnInit } from '@angular/core';
import {FireserService} from '../services/fireser.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { BASE_URL } from '../base_url';

@Component({
  selector: 'app-adminmoodle',
  templateUrl: './adminmoodle.component.html',
  styleUrls: ['./adminmoodle.component.scss']
})
export class AdminmoodleComponent implements OnInit {
  //Data Members
  public loading = false;
  private display_list:any=[];
  private main_list:any=[];
  public highest=true;
  private tracker:any='';

  constructor(private afd:FireserService, private afd2:AngularFireDatabase) { }
  ngOnInit() {
    this.getFolders();
  }

  getFiles(){
    console.log(this.display_list.file);
  }

  getFolders(){
    this.loading=true;
    this.afd.pullList('data/moodle/folder/').snapshotChanges().subscribe(success=>{
      //console.log(this.afd.snapshotToArray2(success));
      this.display_list=this.afd.snapshotToArray2(success);
      this.main_list=this.afd.snapshotToArray2(success);
      this.getFiles()
      this.loading=false;
    })
  }

  open_folder(index:any){
    console.log(this.display_list[index].folder);
    this.tracker=this.tracker+'/'+index;
    // console.log(this.tracker);
    this.display_list=this.display_list[index].folder;
    this.highest=false;
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

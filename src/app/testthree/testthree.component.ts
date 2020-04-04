import { Component, OnInit } from '@angular/core';
import {FireserService} from '../services/fireser.service';

@Component({
  selector: 'app-testthree',
  templateUrl: './testthree.component.html',
  styleUrls: ['./testthree.component.scss']
})
export class TestthreeComponent implements OnInit {

  constructor(private afd:FireserService) { }

  //data
  public loading = false;
  moodle_data:any=[];
  file_data:any=[];

  ngOnInit() {
    this.getStuff();
  }

getStuff(){
  this.loading=true;
  this.afd.pullList('data/moodle/folder/').snapshotChanges().subscribe(success=>{
    this.moodle_data=this.afd.snapshotToArray2(success);
    console.log(this.moodle_data);
  })
  this.loading=false;
}

openFolder(index:any){
  if(this.moodle_data[index].hasOwnProperty("files")){
    this.file_data=this.moodle_data[index].files;
    this.moodle_data=this.moodle_data[index].folder;
  }
  else{
    this.file_data=[];
    this.moodle_data=this.moodle_data[index].folder;
  }
}

openFile(){
  
}

}

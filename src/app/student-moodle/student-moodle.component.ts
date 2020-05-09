import { Component, OnInit } from '@angular/core';
import {FireserService} from '../services/fireser.service';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { BASE_URL } from '../base_url';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-moodle',
  templateUrl: './student-moodle.component.html',
  styleUrls: ['./student-moodle.component.scss']
})
export class StudentMoodleComponent implements OnInit {

  constructor(private afd:FireserService, private afs:FirestoreService, private router:Router) { }
//Form
newFolderForm: any = new FormGroup({
  folder_name: new FormControl('', Validators.required)
});
//data

//new folder button
newfolderbutton:any=false;
//form data
form_data:any;
//loading
public loading = false;
//direct from firebase
main_data:any=[];
moodle_data:any=[];
//extracted from other data member, only has knowledge of files
file_data:any=[];
//actives back button
highest:any=true;
//tracks folders for upload and download
tracker:any;
//more detailed tracker
hardtracker:any;

//trial of back button
storage:any[][]=[];
i=0;
//trial ends: success

//file upload variables
selectedfile:any;
selectedfilepath:any;
//session
sessiondata:any;


  ngOnInit() {
    this.getSession();
  }
  getSession(){
    if(sessionStorage.length>0){
      // logged in
      this.sessiondata=JSON.parse(sessionStorage.getItem('key'))
      // console.log(this.sessiondata)
      this.getStuff();
    }else{
      //not logged in
      this.router.navigateByUrl('/home')
      Swal.fire(
        "Please Login First",
        'Login to access this page',
        'info'
      )
    }
  }
  getStuff(){
    this.loading=true;
    this.afd.pullList('data/moodle/'+this.sessiondata.department+'/folder/').snapshotChanges().subscribe(success=>{
      this.moodle_data=this.afd.snapshotToArray2(success);
      this.main_data=this.afd.snapshotToArray2(success);
      //console.log(this.main_data);
    })
    this.tracker="";
    this.hardtracker="";
    this.loading=false;
  }
  openFolder(index:any){
    this.highest=false;
    if(this.moodle_data[index].hasOwnProperty("files")){
      this.file_data=this.moodle_data[index].files;

      this.tracker=this.tracker+"/"+this.moodle_data[index].name;
      this.hardtracker=this.hardtracker+'/'+index+'/folder';

      //trial
      this.storage[this.i]=this.moodle_data;
      this.i++;

      this.moodle_data=this.moodle_data[index].folder;
    }
    else{
      this.file_data=[];

      this.tracker=this.tracker+"/"+this.moodle_data[index].name;
      this.hardtracker=this.hardtracker+'/'+index+'/folder';

      //trial
      this.storage[this.i]=this.moodle_data;
      this.i++;

      this.moodle_data=this.moodle_data[index].folder;
    }
  }
  back(){
    let temp:any
    let temp_number:any
  //back function go to previous folder in moodle
  if(this.i==0){
    this.highest=true;
  }
  else{
  //shows name of current folder
    //console.log(this.storage[this.i]);
    this.moodle_data=this.storage[--this.i];
    //console.log(this.moodle_data)
    this.tracker=this.tracker.slice(0,this.tracker.lastIndexOf("/"));
    this.hardtracker=this.hardtracker.slice(0, this.hardtracker.lastIndexOf("/"));
    this.hardtracker=this.hardtracker.slice(0, this.hardtracker.lastIndexOf("/"));
    if(this.i==0)
    this.highest=true;
    temp=this.hardtracker.slice(0, this.hardtracker.lastIndexOf("/"))
    //console.log(temp[temp.length-1])
    temp_number=temp[temp.length-1]
    if(this.storage[this.i-1][temp_number].hasOwnProperty("files")){
      this.file_data=this.storage[this.i-1][temp_number].files
      //console.log("if")
    }else{
      this.file_data=[];
      //console.log("else")
    }
    //console.log(this.storage[this.i-1])
  }
  }
  openFile(index:any){
    let url:any;
    //file click function what to do when file is double clicked
    console.log("/moodle"+this.file_data[index].file_location+'/'+this.file_data[index].name);
    this.afs.downloadFile('/moodle'+this.file_data[index].file_location+'/'+this.file_data[index].name).subscribe(success=>{
  url=success;
  Swal.fire(
    this.file_data[index].name,
    '<a href='+url+' target="_blank">Download</a>',
    'info'
  )
  console.log(url)
    }, error=>{console.log(error)})
    // Swal.fire({type:'info',title: ""});

  }

}

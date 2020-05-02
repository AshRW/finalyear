// TEST SUCCESSFUL TRANSFERED TO ADMIN MOODLE: WORKING


import { Component, OnInit } from '@angular/core';
import {FireserService} from '../services/fireser.service';
import { FirestoreService } from '../services/firestore.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-testthree',
  templateUrl: './testthree.component.html',
  styleUrls: ['./testthree.component.scss']
})
export class TestthreeComponent implements OnInit {

  constructor(private afd:FireserService, private afs:FirestoreService) { }
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


  ngOnInit() {
    this.getStuff();
  }

getStuff(){
  this.loading=true;
  this.afd.pullList('data/moodle/folder/').snapshotChanges().subscribe(success=>{
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
//back function go to previous folder in moodle
if(this.i==0){
  this.highest=true;
}
else{
//shows name of current folder
  //console.log(this.storage[this.i]);
  this.moodle_data=this.storage[--this.i];
  this.tracker=this.tracker.slice(0,this.tracker.lastIndexOf("/"));
  this.hardtracker=this.hardtracker.slice(0, this.hardtracker.lastIndexOf("/"));
  this.hardtracker=this.hardtracker.slice(0, this.hardtracker.lastIndexOf("/"));
  if(this.i==0)
  this.highest=true;
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


file(event){
  this.selectedfile=event.target.files[0];
  this.selectedfilepath="/moodle"+this.tracker+'/'+this.selectedfile.name;
  //console.log(this.selectedfilepath);
}
fire(){
  let u:any;
  let path:any="";
  let previous_folder:any=[];

  //Temporary Commented. Do not remove. Importnant and working part
  //it is the upload function

  this.afs.uploadFile(this.selectedfile,this.selectedfilepath).subscribe(success=>{
    if(success.totalBytes==success.bytesTransferred){
      Swal.fire({
        type: 'success',
        title: 'File Uploaded',
        text: '1 file uploaded'
      })
      //start
      previous_folder=this.storage[this.i-1]
  path=this.hardtracker.slice(0, this.hardtracker.lastIndexOf("/"));
  u={"name":this.selectedfile.name, "file_no":0, "file_location":this.tracker}
  console.log("Path: "+path+" U: ");
  console.log(u)
  //console.log(previous_folder);
  //console.log(path[path.length-1])
  // this.afd.push(path, u);
  if(previous_folder[path[path.length-1]].files==undefined){
// console.log("undefined aaaya")
console.log("/data/moodle/folder/"+path+"/files/0/")
u={"name":this.selectedfile.name, "file_no":0, "file_location":this.tracker}
this.afd.push("/data/moodle/folder/"+path+"/files/0/", u);
  }
  else{
    console.log("else wala part aaya");

console.log("/data/moodle/folder"+path+"/files/"+previous_folder[path[path.length-1]].files.length+"/")
u={"name":this.selectedfile.name, "file_no":previous_folder[path[path.length-1]].files.length, "file_location":this.tracker}
console.log(u);
this.afd.push("/data/moodle/folder"+path+"/files/"+previous_folder[path[path.length-1]].files.length+"/", u);
  }
      //end
    }
  })

}

new_Folder(){
  this.newfolderbutton=false;
  this.form_data=this.newFolderForm.value.folder_name;
  //console.log(this.hardtracker+'/'+this.form_data);
  //console.log(this.moodle_data);
  let u:any;
  let path:any
  if(this.moodle_data==undefined){
    //empty folder
    // console.log(this.hardtracker+"/0/")
    path="data/moodle/folder"+this.hardtracker+"/0/";
    u={"folder_no":0, "name":this.form_data};
    this.afd.push(path,u)
    window.location.reload()
  }
  else{
    //new folder along side existing
    path="data/moodle/folder"+this.hardtracker+"/"+this.moodle_data.length+"/";
    u={"folder_no":this.moodle_data.length, "name":this.form_data};
    this.afd.push(path,u)
    console.log(path)
    window.location.reload()
  }

}
showTracker(){
  console.log('Hard: '+this.hardtracker)
  console.log('Norm: '+this.tracker)
}

newFolderButton(){
  this.newfolderbutton=true;
}

}

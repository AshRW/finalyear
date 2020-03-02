import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FirestoreService} from '../services/firestore.service';
import { AngularFireDatabase } from '@angular/fire/database';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testone',
  templateUrl: './testone.component.html',
  styleUrls: ['./testone.component.scss']
})
export class TestoneComponent implements OnInit {
  selectedfile:any;
  selectedfilepath:any;
  uploadstatus=false;

  constructor(private router:Router, private storage:FirestoreService, private afd:AngularFireDatabase) { }

  ngOnInit() {
  }
  
  fire(){
    this.storage.uploadFile(this.selectedfile, this.selectedfilepath).subscribe(success=>{
      if(success.totalBytes==success.bytesTransferred){
        const key=this.afd.createPushId();
        
        Swal.fire({
          type: 'success',
          title: 'File Uploaded',
          text: '1 file uploaded'
        })
      }
    })
  }  
  file(event){
    this.selectedfile=event.target.files[0];
    const key=this.afd.createPushId();
    // this.selectedfilepath='/tiral/'+key+'/'+this.selectedfile.name;
    this.selectedfilepath='/tiral/'+this.selectedfile.name;
  }
}
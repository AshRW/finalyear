import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-testtwo',
  templateUrl: './testtwo.component.html',
  styleUrls: ['./testtwo.component.scss']
})
export class TesttwoComponent implements OnInit {

  constructor(private afs:FirestoreService) { }
  selectedfile:any;
  selectedfilepath:any;
  ngOnInit() {
  }
  file(event){
    this.selectedfile=event.target.files[0];
    this.selectedfilepath='/tiral1/'+this.selectedfile.name;
  }
  fire(){
    this.afs.uploadFile(this.selectedfile,this.selectedfilepath).subscribe(success=>{
      if(success.totalBytes==success.bytesTransferred){
        Swal.fire({
          type: 'success',
          title: 'File Uploaded',
          text: '1 file uploaded'
        })
      }
    })
  }

}

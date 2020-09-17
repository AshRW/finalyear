import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  downloadURL:Observable<string>;
  uploadPercent: Observable<number>;
  fileUrl: Observable<any>;

  constructor(private afs:AngularFireStorage) { }

  uploadFile(file, filePath) {
    // const file = event.target.files[0];
    // const filePath = '/trial/ok/';
    const fileRef = this.afs.ref(filePath);
    const task = this.afs.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    return task.snapshotChanges().pipe(
      finalize(() => {this.downloadURL = fileRef.getDownloadURL() })
     )
    //  .subscribe()
   // return this.downloadURL=fileRef.getDownloadURL();
  }
  
  downloadFile(path){
    const ref=this.afs.ref(path);
    return this.fileUrl=ref.getDownloadURL();
  }
}


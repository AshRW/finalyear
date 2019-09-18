import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  ngOnInit(){
    console.log("Hello world");
  }
  title = 'mainproject';
}


// var snapshotToArray = function(snaps){
//   var returnArr = [];
//   snaps.forEach(element => {
//     let key = element.key;
//     let obj = element.payload.val();
//     obj.key = key;
//     returnArr.push(obj);
//   });
//   return returnArr;
// }

import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private afd:AngularFireDatabase) { }

  ngOnInit() {
  }
trial(){
  this.afd.object("/test/").set({"lol":"okay"})
}

}

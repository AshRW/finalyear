import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testone',
  templateUrl: './testone.component.html',
  styleUrls: ['./testone.component.scss']
})
export class TestoneComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  a=6;
  fire(){
    this.router.navigateByUrl("/adminlogin");
  }  

}

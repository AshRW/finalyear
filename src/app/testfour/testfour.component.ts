import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery'
// declare var jquery: any;
// declare var $: any;
// import jquery = require("jquery");
// const $: JQueryStatic = jquery;
// import $ = require('jquery') ; window.$ = $;
@Component({
  selector: 'app-testfour',
  templateUrl: './testfour.component.html',
  styleUrls: ['./testfour.component.scss']
})
export class TestfourComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  button_click(){
    // $('.alert').alert('close')
  }
}

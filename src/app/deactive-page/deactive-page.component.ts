import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deactive-page',
  templateUrl: './deactive-page.component.html',
  styleUrls: ['./deactive-page.component.scss']
})
export class DeactivePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Swal.fire({
      type: 'error',
      title: 'Your Licence has been Expired',
      footer: 'Please Contact SimpleCademey Team'
    })
  }

}

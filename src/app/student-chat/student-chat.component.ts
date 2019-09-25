import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-chat',
  templateUrl: './student-chat.component.html',
  styleUrls: ['./student-chat.component.scss']
})
export class StudentChatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  msgForm:any=new FormGroup({
    message:new FormControl('', Validators.required)
  });

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-registration',
  templateUrl: './teacher-registration.component.html',
  styleUrls: ['./teacher-registration.component.scss']
})
export class TeacherRegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  teacherregForm:any = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });
  form_data:any;
  register(){
    this.form_data=this.teacherregForm.value;
    console.log(this.form_data);
  }
}

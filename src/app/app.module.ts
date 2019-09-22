import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import {AngularFireAuthModule } from '@angular/fire/auth';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import Swal from 'sweetalert2'
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { TeacherRegistrationComponent } from './teacher-registration/teacher-registration.component';
import { InstituteAdminLoginComponent } from './institute-admin-login/institute-admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TeacherDashComponent } from './teacher-dash/teacher-dash.component';
import { StudentDashComponent } from './student-dash/student-dash.component';


var firebaseConfig = {
  apiKey: "AIzaSyAlLYUhYKAkAchSeJLCtKNsBBoNSEVjBro",
  authDomain: "final-year-2fffe.firebaseapp.com",
  databaseURL: "https://final-year-2fffe.firebaseio.com",
  projectId: "final-year-2fffe",
  storageBucket: "",
  messagingSenderId: "332019641222",
  appId: "1:332019641222:web:de1098980f2d492bd4da07"
};
var routes:Routes=[
  {path: "home", component: HomePageComponent},
  {path:'', redirectTo:'home', pathMatch: "full"},
  {path: "login", component: LoginPageComponent},
  {path: "registration", component: RegistrationPageComponent},
  {path: "studentregistration", component: StudentRegistrationComponent},
  {path: "teacherregistration", component: TeacherRegistrationComponent},
  {path:"adminlogin", component: InstituteAdminLoginComponent},
  {path:"admindash", component:AdminDashboardComponent},
  {path:"studentdash", component:StudentDashComponent},
  {path:"teacherdash", component:TeacherDashComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    StudentRegistrationComponent,
    TeacherRegistrationComponent,
    InstituteAdminLoginComponent,
    AdminDashboardComponent,
    TeacherDashComponent,
    StudentDashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,AngularFireAuthModule,
    FormsModule, ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { TeacherRegistrationComponent } from './teacher-registration/teacher-registration.component';
import { InstituteAdminLoginComponent } from './institute-admin-login/institute-admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

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
  {path:"admindash", component:AdminDashboardComponent}
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
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,AngularFireAuthModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
